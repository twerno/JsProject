///<reference path="../Utils.ts"/>
///<reference path="../commons/AsyncTaskRunner.ts"/>

"use strict";

module testEC6 {

    export enum TestResultState { NEW, WORKING, SUCCESS, FAILED, TIMEOUT }


    export class TestResult {
        parent: GroupResult;
        testId: string = null;

        state: TestResultState = TestResultState.NEW;
        errorMsg: string = null;

        executionTime: number = 0;
        timeLimit: number = 0;
    }


    export class GroupResult {
        root: Result;
        groupId: string = null;

        state: TestResultState = TestResultState.NEW;
        errorMsg: string = null;

        allTestCount: number = 0;
        succeedCount: number = 0;
        failedCount: number = 0;

        executionTime: number = 0;
        tests: TestResult[] = [];
    }


    export class Result {
        allTestCount: number = 0;
        succeedCount: number = 0;
        failedCount: number = 0;

        executionTime: number = 0;
        groups: GroupResult[] = [];
        errors: string[] = [];
    }


    export type TestContext = Object;


    export interface ITestContextFactory {
        buildTestContext(): TestContext;
    }


    export class Test extends asyncRunner6.IAsyncTask {

        timeLimit(): number { return 0 }; // 0 -unlimited

        testId(): string { return Utils.getNameOfClass(this) }

        protected runTests(): void {
            throw new Error(`runTests() of test: ${this.testId() } has not been implemented!`);
        }



        testContext: TestContext = null;
        protected onSuccess: asyncRunner6.AsyncTaskSuccess = null;
        protected onFailure: asyncRunner6.AsyncTaskFailure = null;

        run(onSuccess: asyncRunner6.AsyncTaskSuccess, onFailure: asyncRunner6.AsyncTaskFailure): void {
            this.onSuccess = onSuccess || null;
            this.onFailure = onFailure || null;
            this.runTests();
        }

        protected assertTrue(check: boolean, customErrorDesc: string): void {
            if (!check) {
                this.onFailure && this.onFailure(new Error(customErrorDesc));
                throw new TestInterruptError();
            }
        }

        protected assertFalse(check: boolean, customErrorDesc: string): void {
            this.assertTrue(!check, customErrorDesc);
        }
    }



    class TestInterruptError extends Error { }


    class TestCase {
        constructor(public testId: string, public timeLimit: number, public testClass: Function) { }  
    }


    class TestGroup {
        constructor(public groupId: string, public contextFactory: ITestContextFactory, public testCases: TestCase[]) { }  
    }


    class TestStateHolder {
        currentGroupIdx: number = null;
        currentTestIdx: number = null;
        currentContext: Object = null;
        currentTestCase: TestCase = null;
        currentTestRunner: asyncRunner6.AsyncTaskRunner = null;

        result: Result;
        private _weakGroupResultMap: WeakMap<TestGroup, GroupResult> = null;
        private _weakTestResultMap: WeakMap<TestCase, TestResult> = null;

        init(groups: TestGroup[], errors: string[]): void {
            this.currentGroupIdx = 0;
            this.currentTestIdx = -1;
            this.currentContext = null;
            this.currentTestRunner = null;

            this.result = new Result();
            this._weakGroupResultMap = new WeakMap<TestGroup, GroupResult>();
            this._weakTestResultMap = new WeakMap<TestCase, TestResult>();
            this.result.errors = errors;
            this._initResult(groups);
        }

        nextTestIdx(): number {
            return ++this.currentTestIdx; 
        }

        skipCurrentGroup(): void {
            this.currentGroupIdx++;
            this.currentTestIdx = -1;
            this.currentContext = null;
        }

        updateTestState_Running(testCase: TestCase): void {
            this.currentTestCase = testCase;
            let testResult: TestResult = this._weakTestResultMap.get(testCase);
            if (testResult) {
                testResult.state = TestResultState.WORKING;
                testResult.parent.state = testResult.state;
            }
        }

        updateTestState_Success(test: Test): void {
            let testResult: TestResult = this._weakTestResultMap.get(this.currentTestCase);
            if (testResult) {
                testResult.state = TestResultState.SUCCESS;
                this._updateDetails(testResult, test.executionTime, true);
            }
            this.currentTestCase = null;
        }

        updateTestState_Failure(test: Test, code: asyncRunner6.AsyncTaskFailureCode, error: Error): void {
            let testResult: TestResult = this._weakTestResultMap.get(this.currentTestCase);
            if (testResult) {
                testResult.state = (code === asyncRunner6.AsyncTaskFailureCode.TIMEOUT ? TestResultState.TIMEOUT : TestResultState.FAILED);
                testResult.errorMsg = error.message;
                this._updateDetails(testResult, test.executionTime, false);
            }
            this.currentTestCase = null;
        }

        updateGroupState_Failure(group: TestGroup, code: asyncRunner6.AsyncTaskFailureCode, error: Error): void {
            let groupResult: GroupResult = this._weakGroupResultMap.get(group);
            if (groupResult) {
                groupResult.state = (code === asyncRunner6.AsyncTaskFailureCode.TIMEOUT ? TestResultState.TIMEOUT : TestResultState.FAILED);
                groupResult.errorMsg = error.message;
                groupResult.failedCount++;
                groupResult.root.failedCount++;
            }
            this.currentTestCase = null;
        }

        private _updateDetails(testResult: TestResult, executionTime: number, succeed: boolean): void {
            testResult.executionTime = executionTime;
            testResult.parent.executionTime += executionTime;
            testResult.parent.root.executionTime += executionTime;

            if (succeed) {
                testResult.parent.succeedCount++;
                testResult.parent.root.succeedCount++;

                if (testResult.parent.allTestCount === testResult.parent.succeedCount)
                    testResult.parent.state = TestResultState.SUCCESS;
            } else {
                testResult.parent.failedCount++;
                testResult.parent.root.failedCount++;
                testResult.parent.state = testResult.state;
            }
        }

        private _initResult(groups: TestGroup[]): void {
            if (groups)
                for (let i = 0; i < groups.length; i++) {
                    let group: TestGroup = groups[i];
                    let groupResult: GroupResult = new GroupResult();
                    groupResult.groupId = group.groupId;
                    groupResult.root = this.result;

                    this.result.groups.push(groupResult);
                    this._weakGroupResultMap.set(group, groupResult);

                    if (group.testCases)
                        for (let j = 0; j < group.testCases.length; j++) {
                            let testCase: TestCase = group.testCases[j];
                            let testResult: TestResult = new TestResult();
                            testResult.testId = testCase.testId;
                            testResult.parent = groupResult;
                            testResult.timeLimit = testCase.timeLimit;
                            groupResult.tests.push(testResult);

                            this._weakTestResultMap.set(testCase, testResult);
                            this.result.allTestCount++;
                            groupResult.allTestCount++;
                        }
                }
        }
    }


    interface INextTestMeta {
        group: TestGroup,
        test: Test,
        testCase: TestCase,
        testContext: TestContext
    }


    export class TestManager {

        private _groupIdSet: Set<string> = new Set<string>();
        private _groupList: TestGroup[] = [];
        private _testStateHolder: TestStateHolder = null;
        private _errors: string[] = [];


        registerITestGroup(groupId: string, contextFactory: ITestContextFactory, testCaseClassList: Function[]): void {

            if (this._groupIdSet.has(groupId)) {
                this._errors.push(`Group "${groupId}" is already registered.`);
                return;
            }

            let testCases: TestCase[] = [];

            if (testCaseClassList)
                for (let i = 0; i < testCaseClassList.length; i++) {
                    try {
                        let test: Test = <Test> Object.create(testCaseClassList[i]);
                        let testCase: TestCase = new TestCase(test.testId(), test.timeLimit(), testCaseClassList[i]);
                        testCases.push(testCase);
                    } catch (error) {
                        this._errors.push(`Error during creating a TestCase ${i + 1} from: "${groupId}".\n Internal error: ${error.message}`);
                        return;
                    }
                }

            this._groupList.push( new TestGroup(groupId, contextFactory, testCases) );
            this._groupIdSet.add(groupId);
        }


        runTests(): void {
            //this.kill();
            this._testStateHolder = new TestStateHolder();
            this._testStateHolder.init(this._groupList, this._errors);
            this._runNextTest();
        }


        //kill(): void {
        //    this._testStateHolder.currentTestRunner && this._testStateHolder.currentTestRunner.kill();
        //}


        private _runNextTest(): void {

            let next: INextTestMeta = this._getNextTest();
            if (next === null) return;

            try {
                next.test.testContext = next.testContext;
                this._testStateHolder.currentTestRunner = new asyncRunner6.AsyncTaskRunner(
                    next.test,
                    (task: Test, result) => { 
                        this._onSuccessHandler(task, result);
                        this._runNextTest(); 
                    },
                    (task: Test, coder, error) => {
                        this._onFailureHandler(task, coder, error);
                        this._runNextGroup();
                    });

                this._testStateHolder.currentTestRunner.runAsync(next.test.timeLimit() || 0);
                this._testStateHolder.updateTestState_Running(next.testCase);
            } catch (error) {
                if (!(error instanceof TestInterruptError))
                    this._onFailureHandler(next.test, asyncRunner6.AsyncTaskFailureCode.ERROR, error);

                this._runNextGroup();
            }
        }


        private _runNextGroup(): void {
            this._testStateHolder.skipCurrentGroup();
            this._runNextTest();
        }


        private _onSuccessHandler(task: Test, result?: Object): void {
            this._testStateHolder.updateTestState_Success(task);
        }


        private _onFailureHandler(task_or_group: Test|TestGroup, code: asyncRunner6.AsyncTaskFailureCode, error: Error): void {
            error =  error || new Error('Unknown error.') 

            if (task_or_group instanceof Test) 
                this._testStateHolder.updateTestState_Failure(task_or_group, code, error);

            else if (task_or_group instanceof TestGroup) 
                this._testStateHolder.updateGroupState_Failure(task_or_group, code, error);
        }


        private _buildTest(group: TestGroup, testCaseIdx: number, testCase: TestCase): Test {
            if (testCase
                && testCase.testClass
                && testCase.testClass instanceof Function)
                return <Test> Object.create(testCase.testClass);
            else
                throw new Error(`Error during creating TescCase ${testCase.testId} of group: ${group.groupId}.`);
        }


        private _getNextTest(): INextTestMeta {
            let group: TestGroup = this._groupList[this._testStateHolder.currentGroupIdx] || null;

            if (group === null) {
                return null

            } else if (group.testCases.length > this._testStateHolder.nextTestIdx()) {
                try {
                    if (this._testStateHolder.currentContext === null && group.contextFactory)
                        this._testStateHolder.currentContext = group.contextFactory.buildTestContext() || null;

                    let test: Test = this._buildTest(group, this._testStateHolder.currentTestIdx, group.testCases[this._testStateHolder.currentTestIdx]);

                    return {
                        group: group,
                        test: test,
                        testCase: group.testCases[this._testStateHolder.currentTestIdx],
                        testContext: this._testStateHolder.currentContext
                    }
                } catch (error) {
                    this._onFailureHandler(group, asyncRunner6.AsyncTaskFailureCode.ERROR, error);
                    this._testStateHolder.skipCurrentGroup();
                    return this._getNextTest();
                }

            } else {
                this._testStateHolder.skipCurrentGroup();
                return this._getNextTest();
            }
        }
    }
}