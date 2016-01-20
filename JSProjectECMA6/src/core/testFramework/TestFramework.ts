///<reference path="../Utils.ts"/>
///<reference path="../commons/AsyncTaskRunner.ts"/>
///<reference path="Commons.ts"/>

"use strict";

module testEC6 {

    const ONE_MINUTE = 60 * 1000;
    const TEN_SECONDS = 10 * 1000;
    const ONE_SECOND = 1 * 1000;
                  
	/**
	 *  Test
	 */
    export abstract class AsyncTest<T> extends asyncUtils6.AsyncTask<T> {

        timeLimit(): number { return TEN_SECONDS }; // 0 -unlimited

        testId(): string { return Utils.getNameOfClass( this ) }

        // Shared across all tests of the same group
        testContext: TestContext = null;

        constructor(/* no arguments */ ) {
            super()
        }

        abstract run( success: asyncUtils6.TaskSuccessCallback<T>, failure: asyncUtils6.TaskFailureCallback ): AsyncTest<T>;

        protected assertTrue( check: boolean, customErrorDesc: string ): void {
            if ( !check ) {
                throw new AssertError( customErrorDesc );
            }
        }

        protected assertFalse( check: boolean, customErrorDesc: string ): void {
            this.assertTrue( !check, customErrorDesc );
        }
    }
    

    /**
     *  TestEngine
     */
    export class TestEngine {

        private _groupMap: Utils.StringMap<GroupOfTests> = {};

        private _groupOfTestsList: GroupOfTests[] = [];

        private _testEngineState: TestEngineState = null;

        private _testEngineHandlers: TestEngineHandlers = new TestEngineHandlers( null, null );

        private _global_errors: string[] = [];

        private _testRunner: asyncUtils6.AsyncTaskRunner<any> = null;


        registerTestGroup( groupId: string, contextFactory: ITestContextFactory, testClesses: Function | Function[] ): void {
            try {
                let group: GroupOfTests = this._createGroupOfTests( groupId, contextFactory );

                if ( testClesses instanceof Function )
                    this._registerTestsInGroup( group, [testClesses] );
                else if ( testClesses instanceof Array )
                    this._registerTestsInGroup( group, testClesses );
                else
                    throw new GlobalError( `Test must be an AsyncTest class. (${Utils.getNameOfClass( testClesses )})` );

            } catch ( error ) {
                if ( error instanceof GlobalError )
                    this._addGlobalErrorMessage( error.message )
                else
                    throw error;
            }
        }


        private _registerTestsInGroup( group: GroupOfTests, tests: Function[] ): void {
            for ( let i = 0; i <= tests.length; i++ )
                group.registerTest( tests[i] )
        }


        private _createGroupOfTests( groupId: string, contextFactory: ITestContextFactory ): GroupOfTests {
            let result: GroupOfTests = this._groupMap[groupId];
            if ( result )
                throw new GlobalError( `Group "${groupId}" is already registered.` );

            result = new GroupOfTests( groupId, contextFactory, [] );
            this._groupMap[groupId] = null;
            this._groupOfTestsList.push( result );
            return result;
        }


        run( resultUpdater: IResultUpdater ): void {
            this._testRunner && this._testRunner.killSilently();
            this._cleanGlobalErrorMessages();
            this._testEngineState = new TestEngineState( this._testEngineHandlers, this._groupOfTestsList, this._global_errors );
            this._testEngineHandlers.testEngineState = this._testEngineState;
            this._testEngineHandlers.resultUpdater = resultUpdater;
            this._testEngineHandlers.callResultUpdateHandler( null );
            this._runNextTest();
        }


        stop(): void {
            this._testRunner && this._testRunner.killAndCallFailure();
            this._testEngineState.skipAllUnfinishedTestsAndMoveGroupCursor();
        }


        private _runNextTest(): void {
            let testInstanceAndProto: TestInstanceAndProto = this._testEngineState.getNextTestInstanceAndProto();
            if ( testInstanceAndProto === null )
                return;

            try {
                this._testRunner = new asyncUtils6.AsyncTaskRunner<any>( testInstanceAndProto.instance )
                    .success( this._runnerOnSuccessHandler )
                    .failure( this._runnerOnFailureHandler )
                    .run( testInstanceAndProto.proto.timeLimit || 0 );

                this._testEngineHandlers.updateTestState_Running( this._testEngineState.getCurrentTestResult() );
            } catch ( error ) {
                this._testEngineHandlers.onFailureHandler( this._testEngineState.getCurrentTestResult(), asyncUtils6.TaskFailureCode.ERROR, error );

                this._runNextTest();
            }
        }


        private _runnerOnSuccessHandler = ( testExecutionInfo: asyncUtils6.TaskAndExecutionInfo<any>, result: any ): void => {
            this._onSuccessHandler( testExecutionInfo );
            this._runNextTest();
        };


        private _runnerOnFailureHandler = ( testExecutionInfo: asyncUtils6.TaskAndExecutionInfo<any>, code: asyncUtils6.TaskFailureCode, error: Error ): void => {
            //this._onFailureHandler(testExecutionInfo, code, error);
            //this._runNextGroup();
        };


        private _onSuccessHandler( testExecutionInfo: asyncUtils6.TaskAndExecutionInfo<any> ): void {
            this._testEngineHandlers.updateTestState_Success( this._testEngineState.getCurrentTestResult(), testExecutionInfo );
        }


        //        private _onFailureHandler(test_or_group: AsyncTest<any> | GroupOfTests | TestPrototypeAndMetadata, code: asyncUtils6.TaskFailureCode, error: Error): void {
        //            console.error(error);
        //            error = error || new Error('Unknown error.');
        //
        //            if (test_or_group instanceof AsyncTest)
        //                this._testEngineState.updateTestState_Failure(code, error);
        //
        //            else if (test_or_group instanceof GroupOfTests)
        //                this._testEngineState.updateGroupState_Failure(task_or_group, code, error);
        //
        //            else if (test_or_group instanceof TestPrototypeAndMetadata)
        //                this._testEngineState.updateTestCaseState_Failure(task_or_group, code, error);
        //        }


        private _buildTest( group: GroupOfTests, testCaseIdx: number, testCase: TestPrototypeAndMetadata ): AsyncTest<void> {
            try {
                return <AsyncTest<void>>Object.create( testCase.testClassPrototype );
            } catch ( error ) {
                throw new Error( `Error! Creating TestCase ${testCase.testId} of group: ${group.groupId} failed: ${error.message}` );
            }
        }


        private _addGlobalErrorMessage( msg: string ): void {
            this._global_errors.push( msg );
        }

        private _cleanGlobalErrorMessages(): void {
            this._global_errors = [];
        }
    }



    class TestEngineState {

        private _groupIdxCursor: number = 0;
        private _testIdxCursor: number = -1;

        //private currentTestCase: TestPrototypeAndMetadata = null;

        [key: string]: any;

        result: TestResult;
        //private _groupResultMap: Utils.StringMap<TestGroupResult> = {};
        private _testResultMap: Utils.NumberMap<Utils.NumberMap<TestCaseResult>> = {};

        private _groupOfTests: GroupOfTests[];
        private _resultUpdater: IResultUpdater;

        private _testContextOfGroup: TestContext[] = [];


        constructor( private testEngineHandlers: TestEngineHandlers, private groupOfTests: GroupOfTests[], global_errors: string[] ) {
            this._groupOfTests = groupOfTests;

            this.result = new TestResult();
            this._initTestResultObjectWith( groupOfTests );
            this.result.global_errors = global_errors;
        }

        getNextTestInstanceAndProto(): TestInstanceAndProto {
            let result: TestInstanceAndProto = this._buildTestInstanceAndProto( this._groupIdxCursor, ++this._testIdxCursor );
            if ( result === null ) {
                this._testIdxCursor = 0;
                result = this._buildTestInstanceAndProto( ++this._groupIdxCursor, this._testIdxCursor );
            }
            return result;

            //            this.onFailureHandler(testPrototype || currentGroup, asyncUtils6.TaskFailureCode.ERROR, error);
            //            this._skipCurrentGroup();
        }


        private _buildTestInstanceAndProto( groupIdx: number, testIdx: number ): TestInstanceAndProto {
            let group: GroupOfTests = this._groupOfTests[groupIdx] || null;
            if ( group === null
                || testIdx < 0
                || testIdx >= group.testPrototypes.length )
                return null;

            let testContext: TestContext = this._getOrBuildTestContext( groupIdx, group );
            let testPrototype: TestPrototypeAndMetadata = group.testPrototypes[testIdx];
            return new TestInstanceAndProto( testPrototype, testPrototype.createInstance( testContext ) );
        }


        private _getOrBuildTestContext( groupIdx: number, group: GroupOfTests ): TestContext {
            if ( this._testContextOfGroup.hasOwnProperty( groupIdx ) )
                return this._testContextOfGroup[groupIdx] || null;
            else {
                let testContext: TestContext = ( group.contextFactory && group.contextFactory.buildTestContext() ) || null;
                this._testContextOfGroup[groupIdx] = testContext;
                return testContext;
            }
        }


        skipUnfinishedTestsOfCurrentGroup(): void {
            let changes: TestCaseResult[] = this._skipTestsOfGroup( this._groupIdxCursor, this._testIdxCursor );

            this.testEngineHandlers.callResultUpdateHandler( changes );
        }

        skipAllUnfinishedTestsAndMoveGroupCursor(): void {
            let changes: TestCaseResult[] = [];

            changes.concat( this._skipTestsOfGroup( this._groupIdxCursor, this._testIdxCursor ) );
            for ( let i = this._groupIdxCursor + 1; i <= this._groupOfTests.length; i++ )
                changes.concat( this._skipTestsOfGroup( i, 0 ) );

            this.moveGroupCursorTo( this._groupOfTests.length + 1 );

            this.testEngineHandlers.callResultUpdateHandler( changes );
        }


        moveCursorToTheNextGroup(): void {
            this.moveGroupCursorTo( this._groupIdxCursor + 1 );
        }


        moveGroupCursorTo( newPosition: number ): void {
            this._groupIdxCursor = newPosition;
            this._testIdxCursor = -1;
        }


        private _skipTestsOfGroup( groupIdx: number, firstToBeSkipped: number ): TestCaseResult[] {
            let groupResult: TestGroupResult = this.result.groupResults[groupIdx];
            let skipped: TestCaseResult[] = []

            for ( let i = firstToBeSkipped; i < groupResult.testCaseResults.length; i++ ) {
                if ( groupResult.testCaseResults[i].state === TestState.PENDING
                    || groupResult.testCaseResults[i].state === TestState.WORKING ) {
                    groupResult.testCaseResults[i].state = TestState.SKIPPED;
                    skipped.push( groupResult.testCaseResults[i] );
                }
            }

            return skipped;
        }


        destroy(): void {
            for ( let key in this )
                this[key] = null;
        }


        getCurrentTestResult(): TestCaseResult {
            return ( this._testResultMap[this._groupIdxCursor] || {})[this._testIdxCursor] || null;
        }



        private _initTestResultObjectWith( groups: GroupOfTests[] ): void {
            if ( groups )
                for ( let i = 0; i < groups.length; i++ ) {
                    let group: GroupOfTests = groups[i];
                    let groupResult: TestGroupResult = new TestGroupResult();
                    groupResult.groupId = group.groupId;
                    groupResult.parent = this.result;

                    this.result.groupResults.push( groupResult );
                    //this._groupResultMap[i] = groupResult;

                    if ( group.testPrototypes )
                        for ( let j = 0; j < group.testPrototypes.length; j++ ) {
                            let testCase: TestPrototypeAndMetadata = group.testPrototypes[j];
                            let testResult: TestCaseResult = new TestCaseResult();
                            testResult.testId = testCase.testId;
                            testResult.parent = groupResult;
                            testResult.timeLimit = testCase.timeLimit;
                            groupResult.testCaseResults.push( testResult );

                            this._testResultMap[i][j] = testResult;
                            this.result.allTestCount++;
                            groupResult.allTestCount++;
                        }
                }
        }


    }


    class TestEngineHandlers {

        constructor( public testEngineState: TestEngineState, public resultUpdater: IResultUpdater ) { }

        callResultUpdateHandler( changes: TestGroupResult | TestCaseResult | TestCaseResult[] ): void {
            setTimeout(() => {
                this.resultUpdater && this.resultUpdater.update( this.testEngineState.result, changes );
            }, Const.DEFAULT_ASYNC_DELAY );
        }




        updateTestState_Running( testResult: TestCaseResult ): void {
            if ( testResult ) {
                testResult.state = TestState.WORKING;
                testResult.parent.state = testResult.state;
            }
            this.callResultUpdateHandler( testResult );
        }

        updateTestState_Success( testResult: TestCaseResult, taskInfo: asyncUtils6.TaskAndExecutionInfo<any> ): void {
            if ( testResult ) {
                testResult.state = TestState.SUCCESS;
                this._updateDetails( testResult, taskInfo.executionTime );
            }

            this.callResultUpdateHandler( testResult );
        }


        onFailureHandler( test_or_group: TestCaseResult | TestGroupResult, code: asyncUtils6.TaskFailureCode, error: Error ): void {
            console.error( error );
            error = error || new Error( 'Unknown error.' );

            if ( test_or_group instanceof TestCaseResult )
                this.updateTestState_Failure( test_or_group, code, error );

            else if ( test_or_group instanceof TestGroupResult )
                this.updateGroupState_Failure( test_or_group, code, error );

            this.testEngineState.skipUnfinishedTestsOfCurrentGroup();
            this.testEngineState.moveCursorToTheNextGroup();
        }

        updateTestState_Failure( testResult: TestCaseResult, code: asyncUtils6.TaskFailureCode, error: Error ): void {
            if ( testResult ) {
                testResult.state = this._taskFailureCode2TestResultState( code );
                testResult.errorMsg = error.message;
                this._updateDetails( testResult, 0 );
            }

            this.callResultUpdateHandler( testResult );

            if ( code === asyncUtils6.TaskFailureCode.KILLED )
                this.testEngineState.destroy();
        }

        updateGroupState_Failure( groupResult: TestGroupResult, code: asyncUtils6.TaskFailureCode, error: Error ): void {
            if ( groupResult ) {
                groupResult.state = this._taskFailureCode2TestResultState( code );
                groupResult.errorMsg = error.message;
                groupResult.failedCount++;
                groupResult.parent.failedCount++;
            }

            this.callResultUpdateHandler( groupResult );

            if ( code === asyncUtils6.TaskFailureCode.KILLED )
                this.testEngineState.destroy();
        }


        private _updateDetails( testResult: TestCaseResult, executionTime: number ): void {
            testResult.executionTime = executionTime;
            testResult.parent.executionTime += executionTime;
            testResult.parent.parent.executionTime += executionTime;

            if ( testResult.state === TestState.SUCCESS ) {
                testResult.parent.succeedCount++;
                testResult.parent.parent.succeedCount++;

                if ( testResult.parent.allTestCount === testResult.parent.succeedCount )
                    testResult.parent.state = TestState.SUCCESS;
            } else {
                testResult.parent.failedCount++;
                testResult.parent.parent.failedCount++;
                testResult.parent.state = testResult.state;
            }
        }

        private _taskFailureCode2TestResultState( code: asyncUtils6.TaskFailureCode ): TestState {
            if ( code === asyncUtils6.TaskFailureCode.TIMEOUT )
                return TestState.TIMEOUT;

            else if ( code === asyncUtils6.TaskFailureCode.KILLED )
                return TestState.KILLED;

            else
                return TestState.FAILURE;
        }
    }


    class AssertError extends Error {
        constructor( public message: string ) { super( message ) };
    }


    class GlobalError extends Error {
        constructor( public message: string ) { super( message ) };
    }


    class TestPrototypeAndMetadata {
        public testId: string;
        public timeLimit: number;

        createInstance( testContext: TestContext ): AsyncTest<any> {
            try {
                let test: AsyncTest<any> = Object.create( this.testClassPrototype );
                test.testContext = testContext;
                return test;
            } catch ( error ) {
                throw new Error( `Error! Creating instance of ${this.testId} failed.\n Error message: ${error.message}` );
            }
        }

        constructor( public testClassPrototype: Function ) {
            let instance: AsyncTest<any> = this.createInstance( null );
            this.testId = instance.testId();
            this.timeLimit = instance.timeLimit();
        }
    }


    class GroupOfTests {

        private _checkClass( meta: TestPrototypeAndMetadata ): void {
            let instance: AsyncTest<any> = meta.createInstance( null );
            if ( !( instance instanceof AsyncTest ) )
                throw new GlobalError( `Test class has to be an AsyncTest!` )
        }

        registerTest( testClass: Function ): void {
            let testId: string = 'unknown';
            try {
                let meta: TestPrototypeAndMetadata = new TestPrototypeAndMetadata( testClass.prototype );
                testId = meta.testId;
                this._checkClass( meta );
                this.testPrototypes.push( meta );
            } catch ( error ) {
                throw new GlobalError( `[Group: ${this.groupId}; TestIdx: ${this.testPrototypes.length}].\n Error message: ${error.message}` );
            }
        }

        constructor( public groupId: string, public contextFactory: ITestContextFactory, public testPrototypes: TestPrototypeAndMetadata[] ) { }
    }


    class TestInstanceAndProto {
        constructor( public proto: TestPrototypeAndMetadata, public instance: AsyncTest<void> ) { };
    }

}