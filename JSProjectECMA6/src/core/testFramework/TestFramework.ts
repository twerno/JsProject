///<reference path="../Utils.ts"/>
///<reference path="../commons/AsyncTaskRunner.ts"/>
///<reference path="Commons.ts"/>

"use strict";

module testEC6 {

    const ONE_SECOND = 1 * 1000;
    const FIVE_SECONDS = 5 * ONE_SECOND;
    const TEN_SECONDS = 10 * ONE_SECOND;
    const ONE_MINUTE = 60 * ONE_SECOND;
                  
	/**
	 *  Test
	 */
    export abstract class AsyncTest<T> extends asyncUtils6.AsyncTask<T> {

        timeLimit(): number { return FIVE_SECONDS }; // 0 -unlimited

        name(): string { return Utils.getNameOfClass(this) }

        // Shared across all tests of the same group
        testContext: TestContext = null;

        constructor(/* no arguments */) {
            super()
        }

        abstract run(success: asyncUtils6.TaskSuccessCallback<T>, failure: asyncUtils6.TaskFailureCallback): void;

        protected assertTrue(check: boolean, customErrorDesc: string): void {
            if (!check) {
                throw new AssertError(customErrorDesc);
            }
        }

        protected assertFalse(check: boolean, customErrorDesc: string): void {
            this.assertTrue(!check, customErrorDesc);
        }
    }
    

    /**
     *  TestEngine
     */
    export class TestEngine {

        private _groupMap: Collection.StringMap<GroupOfTests> = new Collection.StringMap<GroupOfTests>(); // <groupId, Group>

        private _groupOfTestsList: GroupOfTests[] = []; // list of GroupOfTests

        private _cursor: TestResultAndCursorHolder = null;

        private _handlers: ResultUpdateHandlers = new ResultUpdateHandlers();

        private _global_errors: string[] = [];

        private _testRunner: asyncUtils6.AsyncTaskRunner<any> = null;


        registerTestGroup(groupId: string, contextFactory: ITestContextFactory, testClesses: Function | Function[]): void {
            try {
                let group: GroupOfTests = this._createGroupOfTests(groupId, contextFactory);

                if (testClesses instanceof Function)
                    this._registerTestsInGroup(group, [testClesses]);
                else if (testClesses instanceof Array)
                    this._registerTestsInGroup(group, testClesses);
                else
                    throw new GlobalError(`Test must be an AsyncTest<any> constructor. (${Utils.getNameOfClass(testClesses)})`);

            } catch (error) {
                if (error instanceof GlobalError)
                    this._addGlobalErrorMessage(error.message)
                else
                    throw error;
            }
        }


        private _registerTestsInGroup(group: GroupOfTests, tests: Function[]): void {
            for (let i = 0; i <= tests.length; i++)
                group.registerTest(tests[i])
        }


        private _createGroupOfTests(groupId: string, contextFactory: ITestContextFactory): GroupOfTests {
            if (this._groupMap.has(groupId))
                throw new GlobalError(`Group "${groupId}" is already registered.`);

            let result: GroupOfTests = new GroupOfTests(groupId, contextFactory, []);
            this._groupMap.put(groupId, null);
            this._groupOfTestsList.push(result);
            return result;
        }


        run(resultUpdater: IResultUpdateListener): void {
            this._testRunner && this._testRunner.killSilently();
            this._cleanGlobalErrorMessages();

            this._cursor = new TestResultAndCursorHolder(this._handlers, this._groupOfTestsList, this._global_errors);
            this._handlers.result = this._cursor.result;
            this._handlers.resultUpdater = resultUpdater;

            this._handlers.callResultUpdate(null);
            this._runNextTest();
        }


        stop(): void {
            this._testRunner && this._testRunner.killAndCallFailure();
            this._cursor.skipAllUnfinishedTestsAndMoveCursor();
        }


        private _runNextTest(): void {
            let testInstanceAndProto: TestInstanceAndProto = null;
            try {
                this._cursor.moveCursorToTheNextTest();
                testInstanceAndProto = this._cursor.getCurrentTestInstanceAndProto();
                if (!testInstanceAndProto)
                    return;

                this._testRunner = testInstanceAndProto.instance.buildRunner();
                this._testRunner
                    .success(this._runnerOnSuccessHandler)
                    .failure(this._runnerOnFailureHandler)
                    .run(testInstanceAndProto.proto.timeLimit || 0);

                this._handlers.updateTestState_Running(this._cursor.getCurrentTestResult());
            } catch (error) {
                this._onFailureHandler(this._cursor.getCurrentTestResult(), asyncUtils6.TaskFailureCode.ERROR, error);

                this._runNextTest();
            }
        }


        private _runnerOnSuccessHandler = (testExecutionInfo: asyncUtils6.TaskAndExecutionInfo<any>, result: any): void => {
            this._handlers.updateTestState_Success(this._cursor.getCurrentTestResult(), testExecutionInfo);
            this._runNextTest();
        };


        private _runnerOnFailureHandler = (testExecutionInfo: asyncUtils6.TaskAndExecutionInfo<any>, code: asyncUtils6.TaskFailureCode, error: Error): void => {
            this._onFailureHandler(this._cursor.getCurrentTestResult(), asyncUtils6.TaskFailureCode.ERROR, error);
            //            this._onFailureHandler(testExecutionInfo, code, error);
            this._runNextTest();
        };


        private _onFailureHandler(test_or_group: Result_Test | Result_Group, code: asyncUtils6.TaskFailureCode, error: Error): void {
            console.error(error);
            error = error || new Error('Unknown error.');

            if (test_or_group instanceof Result_Test)
                this._handlers.updateTestState_Failure(test_or_group, code, error);

            else if (test_or_group instanceof Result_Group)
                this._handlers.updateGroupState_Failure(test_or_group, code, error);

            this._cursor.skipUnfinishedTestsOfCurrentGroup();
            this._cursor.moveCursorToTheNextGroup();
        }


        private _addGlobalErrorMessage(msg: string): void {
            this._global_errors.push(msg);
        }


        private _cleanGlobalErrorMessages(): void {
            this._global_errors = [];
        }
    }



    /**
     *  TestResultAndCursorHolder
     */
    class TestResultAndCursorHolder {

        private _groupIdxCursor: number = 0;

        private _testIdxCursor: number = -1;

        result: Result_Root;

        private _testResultMap: Collection.INumberMap<Collection.INumberMap<Result_Test>> = {};

        private _groupOfTests: GroupOfTests[];

        private _testContextOfGroup: TestContext[] = [];



        constructor(private handlers: ResultUpdateHandlers, private groupOfTests: GroupOfTests[], global_errors: string[]) {
            this._groupOfTests = groupOfTests;

            this.result = new Result_Root();
            this._initTestResultObjectWith(groupOfTests);
            this.result.global_errors = global_errors;
        }


        getCurrentTestInstanceAndProto(): TestInstanceAndProto {
            return this._buildTestInstanceAndProto(this._groupIdxCursor, this._testIdxCursor);
        }


        private _buildTestInstanceAndProto(groupIdx: number, testIdx: number): TestInstanceAndProto {
            let group: GroupOfTests = this._groupOfTests[groupIdx] || null;
            if (group === null
                || testIdx < 0
                || testIdx >= group.testPrototypes.length)
                return null;

            let testContext: TestContext = this._getOrBuildTestContext(groupIdx, group);
            let testPrototype: TestPrototypeAndMetadata = group.testPrototypes[testIdx];
            return new TestInstanceAndProto(testPrototype, testPrototype.createInstance(testContext));
        }


        private _getOrBuildTestContext(groupIdx: number, group: GroupOfTests): TestContext {
            if (this._testContextOfGroup.hasOwnProperty(groupIdx))
                return this._testContextOfGroup[groupIdx] || null;
            else {
                let testContext: TestContext = (group.contextFactory && group.contextFactory.buildTestContext()) || null;
                this._testContextOfGroup[groupIdx] = testContext;
                return testContext;
            }
        }


        skipUnfinishedTestsOfCurrentGroup(): void {
            let changes: Result_Test[] = this._skipTestsOfGroup(this._groupIdxCursor, this._testIdxCursor);

            this.handlers.callResultUpdate(changes);
        }


        skipAllUnfinishedTestsAndMoveCursor(): void {
            let changes: Result_Test[] = [];

            changes.concat(this._skipTestsOfGroup(this._groupIdxCursor, this._testIdxCursor));
            for (let i = this._groupIdxCursor + 1; i <= this._groupOfTests.length; i++)
                changes.concat(this._skipTestsOfGroup(i, 0));

            this.moveGroupCursorTo(this._groupOfTests.length + 1);

            this.handlers.callResultUpdate(changes);
        }


        moveCursorToTheNextGroup(): void {
            this.moveGroupCursorTo(this._groupIdxCursor + 1);
        }


        moveGroupCursorTo(newPosition: number): void {
            this._groupIdxCursor = newPosition;
            this._testIdxCursor = -1;
        }


        moveCursorToTheNextTest(): void {
            let group: GroupOfTests = this._groupOfTests[this._groupIdxCursor] || null;

            if (group === null)
                return null;
            else if (group.testPrototypes.length > this._testIdxCursor + 1)
                ++this._testIdxCursor;
            else {
                this.moveCursorToTheNextGroup();
                this.moveCursorToTheNextTest();
            }
        }


        private _skipTestsOfGroup(groupIdx: number, firstToBeSkipped: number): Result_Test[] {
            let groupResult: Result_Group = this.result.resultOfGroups[groupIdx] || null;
            let skipped: Result_Test[] = []

            if (groupResult)
                for (let i = firstToBeSkipped; i < groupResult.resultOfTests.length; i++) {
                    if (groupResult.resultOfTests[i].state in [TestState.PENDING, TestState.WORKING]) {
                        groupResult.resultOfTests[i].state = TestState.SKIPPED;
                        skipped.push(groupResult.resultOfTests[i]);
                    }
                }
            return skipped;
        }


        getCurrentTestResult(): Result_Test {
            return (this._testResultMap[this._groupIdxCursor] || {})[this._testIdxCursor] || null;
        }


        private _initTestResultObjectWith(groups: GroupOfTests[]): void {
            if (groups)
                for (let i = 0; i < groups.length; i++) {
                    let group: GroupOfTests = groups[i];
                    let groupResult: Result_Group = new Result_Group();
                    groupResult.groupId = group.groupId;
                    groupResult.parent = this.result;
                    this._testResultMap[i] = this._testResultMap[i] || [];

                    this.result.resultOfGroups.push(groupResult);

                    if (group.testPrototypes)
                        for (let j = 0; j < group.testPrototypes.length; j++) {
                            let testCase: TestPrototypeAndMetadata = group.testPrototypes[j];
                            let testResult: Result_Test = new Result_Test();
                            testResult.name = testCase.name;
                            testResult.parent = groupResult;
                            testResult.timeLimit = testCase.timeLimit;
                            groupResult.resultOfTests.push(testResult);

                            this._testResultMap[i][j] = testResult;
                            this.result.allTestCount++;
                        }
                }
        }

    }



	/**
	 *
	 */
    class ResultUpdateHandlers {

        result: Result_Root;
        resultUpdater: IResultUpdateListener = null;



        callResultUpdate(changes: Result_Group | Result_Test | Result_Test[]): void {
            setTimeout(() => {
                this.resultUpdater && this.resultUpdater.update(this.result, changes);
            }, Const.DEFAULT_ASYNC_DELAY);
        }


        updateTestState_Running(testResult: Result_Test): void {
            if (testResult) {
                testResult.state = TestState.WORKING;
                testResult.parent.state = testResult.state;
            }
            this.callResultUpdate(testResult);
        }


        updateTestState_Success(testResult: Result_Test, taskInfo: asyncUtils6.TaskAndExecutionInfo<any>): void {
            if (testResult) {
                testResult.state = TestState.SUCCESS;
                this._updateDetails(testResult, taskInfo.executionTime);
            }

            this.callResultUpdate(testResult);
        }


        updateTestState_Failure(testResult: Result_Test, code: asyncUtils6.TaskFailureCode, error: Error): void {
            if (testResult) {
                testResult.state = this._taskFailureCode2TestResultState(code, error);
                testResult.errorMsg = error.message;
                this._updateDetails(testResult, 0);
            }

            this.callResultUpdate(testResult);
        }


        updateGroupState_Failure(groupResult: Result_Group, code: asyncUtils6.TaskFailureCode, error: Error): void {
            if (groupResult) {
                groupResult.state = this._taskFailureCode2TestResultState(code, error);
                groupResult.errorMsg = error.message;
                groupResult.failedCount++;
                groupResult.parent.failedCount++;
            }

            this.callResultUpdate(groupResult);
        }


        private _updateDetails(testResult: Result_Test, executionTime: number): void {
            testResult.executionTime = executionTime;
            testResult.parent.executionTime += executionTime;
            testResult.parent.parent.executionTime += executionTime;

            if (testResult.state === TestState.SUCCESS) {
                testResult.parent.succeedCount++;
                testResult.parent.parent.succeedCount++;

                if (testResult.parent.resultOfTests.length === testResult.parent.succeedCount)
                    testResult.parent.state = TestState.SUCCESS;
            } else {
                testResult.parent.failedCount++;
                testResult.parent.parent.failedCount++;
                testResult.parent.state = testResult.state;
            }
        }


        private _taskFailureCode2TestResultState(code: asyncUtils6.TaskFailureCode, error: Error): TestState {
            if (code === asyncUtils6.TaskFailureCode.TIMEOUT)
                return TestState.TIMEOUT;

            else if (code === asyncUtils6.TaskFailureCode.KILLED)
                return TestState.KILLED;

            else if (code === asyncUtils6.TaskFailureCode.ERROR && error instanceof AssertError)
                return TestState.FAILURE_ASSERTION
            else
                return TestState.FAILURE_EXCEPTION;
        }
    }


    class AssertError extends Error {
        constructor(public message: string) { super(message) };
    }


    class GlobalError extends Error {
        constructor(public message: string) { super(message) };
    }


    class TestPrototypeAndMetadata {
        public name: string;
        public timeLimit: number;


        createInstance(testContext: TestContext): AsyncTest<any> {
            try {
                let test: AsyncTest<any> = Object.create(this.testClassPrototype);
                test.testContext = testContext;
                return test;
            } catch (error) {
                throw new Error(`Error! Creating instance of ${this.name} failed.\n Error message: ${error.message}`);
            }
        }


        constructor(public testClassPrototype: Function) {
            let instance: AsyncTest<any> = this.createInstance(null);
            this.name = instance.name();
            this.timeLimit = instance.timeLimit();
        }
    }


    class GroupOfTests {

        private _checkClass(meta: TestPrototypeAndMetadata): void {
            let instance: AsyncTest<any> = meta.createInstance(null);
            if (!(instance instanceof AsyncTest))
                throw new GlobalError(`Test class has to be an AsyncTest!`)
        }


        registerTest(testClass: Function): void {
            try {
                let meta: TestPrototypeAndMetadata = new TestPrototypeAndMetadata(testClass.prototype);
                this._checkClass(meta);
                this.testPrototypes.push(meta);
            } catch (error) {
                throw new GlobalError(`[Group: ${this.groupId}; TestIdx: ${this.testPrototypes.length}].\n Error message: ${error.message}`);
            }
        }


        constructor(public groupId: string, public contextFactory: ITestContextFactory, public testPrototypes: TestPrototypeAndMetadata[]) { }
    }


    class TestInstanceAndProto {
        constructor(public proto: TestPrototypeAndMetadata, public instance: AsyncTest<any>) { };
    }

}