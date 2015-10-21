///<reference path="../Utils.ts"/>
///<reference path="../commons/AsyncTaskRunner.ts"/>
///<reference path="Commons.ts"/>

"use strict";

module testEC6 {

	/**
	 *  Test
	 */
    export abstract class AsyncTest extends asyncUtils6.IAsyncTask {

        timeLimit(): number { return 6 * 1000 }; // 0 -unlimited

        testId(): string { return Utils.getNameOfClass(this) }

        abstract performTest(): void;


        testContext: TestContext = null;
        private onSuccess: asyncUtils6.TaskSuccessCallback = null;
        private onFailure: asyncUtils6.TaskFailureCallback = null;

        constructor() { super() }

        run(onSuccess: asyncUtils6.TaskSuccessCallback, onFailure: asyncUtils6.TaskFailureCallback): void {
            this.onSuccess = onSuccess || null;
            this.onFailure = onFailure || null;
            this.performTest();
        }

        protected assertTrue(check: boolean, customErrorDesc: string): void {
            if (!check) {
                //this.onFailure && this.onFailure(new Error(customErrorDesc));
                throw new AssertError(customErrorDesc);
            }
        }

        protected assertFalse(check: boolean, customErrorDesc: string): void {
            this.assertTrue(!check, customErrorDesc);
        }

        protected callSuccess(): void {
            this.onSuccess && this.onSuccess(null);
        }
    }
    

    export abstract class SyncTest extends AsyncTest {
        run(onSuccess: asyncUtils6.TaskSuccessCallback, onFailure: asyncUtils6.TaskFailureCallback): void {
            super.run(onSuccess, onFailure);
            this.callSuccess();
        }
    }


	/**
	 *  TestEngine
	 */
    export class TestEngine {

        private _groupIdSet: Set<string> = new Set<string>();
        private _groupList: TestGroup[] = [];
        private _testStateHolder: TestStateHolder = null;
        private _engine_errors: string[] = [];


        registerTestGroup(groupId: string, contextFactory: ITestContextFactory, testClass: Function|Function[]): void {

            if (this._groupIdSet.has(groupId)) {
                this._engine_errors.push(`Group "${groupId}" is already registered.`);
                return;
            }

            let testCases: TestCase[] = [];

            if (testClass instanceof Function) {
                this._addTest2Group(groupId, testClass, testCases)

            } else if (testClass instanceof Array) {
                for (let i = 0; i < testClass.length; i++)
                    this._addTest2Group(groupId, testClass[i], testCases);
            }

            this._groupList.push(new TestGroup(groupId, contextFactory, testCases));
            this._groupIdSet.add(groupId);
        }


        runTests(resultUpdateHandler: IResultPainter): void {
            this._testStateHolder && this._testStateHolder.kill(asyncUtils6.SILENCE);
            this._testStateHolder = new TestStateHolder(resultUpdateHandler, this._groupList, this._engine_errors);
            this._testStateHolder.callResultUpdateHandler(null);
            this._runNextTest();
        }


        kill(): void {
            this._testStateHolder && this._testStateHolder.kill(asyncUtils6.VERBOSE);
        }


        private _runNextTest(): void {
            let testMeta: INextTestMeta = this._getNextTest();
            if (testMeta === null) return;

            try {
                this._testStateHolder.currentTestRunner = new asyncUtils6.AsyncTaskRunner(
                    testMeta.test,
                    (task: AsyncTest, result: Object) => { this._runnerOnSuccessHandler(task) },
                    (task: AsyncTest, code: asyncUtils6.TaskFailureCode, error: Error) => { this._runnerOnFailureHandler(task, code, error) });

                this._testStateHolder.currentTestRunner.run(testMeta.test.timeLimit() || 0, asyncUtils6.ASYNC);
                this._testStateHolder.updateTestState_Running(testMeta.testCase);
            } catch (error) {
                this._onFailureHandler(testMeta.test, asyncUtils6.TaskFailureCode.ERROR, error);
                this._runNextGroup();
            }
        }

        private _runnerOnSuccessHandler(task: AsyncTest): void {
            this._onSuccessHandler(task);
            this._runNextTest();
        }

        private _runnerOnFailureHandler(task: AsyncTest, code: asyncUtils6.TaskFailureCode, error: Error): void {
            this._onFailureHandler(task, code, error);
            this._runNextGroup();
        }


        private _runNextGroup(): void {
            this._testStateHolder.skipCurrentGroup();
            this._runNextTest();
        }


        private _onSuccessHandler(task: AsyncTest): void {
            this._testStateHolder.updateTestState_Success(task);
        }


        private _onFailureHandler(task_or_group: AsyncTest | TestGroup | TestCase, code: asyncUtils6.TaskFailureCode, error: Error): void {
            console.error(error);
            error = error || new Error('Unknown error.');

            if (task_or_group instanceof AsyncTest)
                this._testStateHolder.updateTestState_Failure(task_or_group, code, error);

            else if (task_or_group instanceof TestGroup)
                this._testStateHolder.updateGroupState_Failure(task_or_group, code, error);

            else if (task_or_group instanceof TestCase)
                this._testStateHolder.updateTestCaseState_Failure(task_or_group, code, error);
        }


        private _buildTest(group: TestGroup, testCaseIdx: number, testCase: TestCase): AsyncTest {
            try {
                return <AsyncTest> Object.create(testCase.testClassPrototype);
            } catch (error) {
                throw new Error(`Error! Creating TestCase ${testCase.testId} of group: ${group.groupId} failed: ${error.message}`);
            }
        }


        private _getNextTest(): INextTestMeta {
            let group: TestGroup = this._groupList[this._testStateHolder.currentGroupIdx] || null;
            let testCase: TestCase = null;

            if (group === null) {
                return null

            } else if (group.testCases.length > this._testStateHolder.nextTestIdx()) {
                try {
                    if (this._testStateHolder.currentContext === null)
                        this._testStateHolder.currentContext = (group.contextFactory && group.contextFactory.buildTestContext()) || {};

                    testCase = group.testCases[this._testStateHolder.currentTestIdx];
                    let test: AsyncTest = this._buildTest(group, this._testStateHolder.currentTestIdx, testCase);
                    test.testContext = this._testStateHolder.currentContext;

                    return new INextTestMeta(group.testCases[this._testStateHolder.currentTestIdx], test);
                } catch (error) {
                    this._onFailureHandler(testCase || group, asyncUtils6.TaskFailureCode.ERROR, error);
                    this._testStateHolder.skipCurrentGroup();
                    return this._getNextTest();
                }

            } else {
                this._testStateHolder.skipCurrentGroup();
                return this._getNextTest();
            }
        }


        private _addTest2Group(groupId: string, testClass: Function, testCases: TestCase[]): void {
            try {
                let test: AsyncTest = <AsyncTest> Object.create(testClass.prototype);
                let testCase: TestCase = new TestCase(test.testId(), test.timeLimit(), testClass.prototype);
                testCases.push(testCase);
            } catch (error) {
                this._engine_errors.push(`Error during creating a TestCase ${testCases.length + 1} from: "${groupId}".\n Internal error: ${error.message}`);
                return;
            }
        }
    }



    class TestStateHolder {

        currentGroupIdx: number = null;
        currentTestIdx: number = null;
        currentContext: Object = null;
        currentTestCase: TestCase = null;
        currentTestRunner: asyncUtils6.AsyncTaskRunner = null;

        result: Result;
        private _groupResultMap: Map<TestGroup, GroupResult> = null;
        private _testResultMap: Map<TestCase, TestResult> = null;
        private resultUpdateCalback: IResultPainter;


        constructor(resultUpdateCalback: IResultPainter, groups: TestGroup[], engine_errors: string[]) {
            this.currentGroupIdx = 0;
            this.currentTestIdx = -1;
            this.currentContext = null;
            this.currentTestRunner = null;
            this.resultUpdateCalback = resultUpdateCalback || null;


            this.result = new Result();
            this._groupResultMap = new Map<TestGroup, GroupResult>();
            this._testResultMap = new Map<TestCase, TestResult>();
            this.result.engine_errors = engine_errors;
            this._initResult(groups);
        }

        nextTestIdx(): number {
            return ++this.currentTestIdx;
        }

        skipCurrentGroup(): void {
            let currentGroup: GroupResult = this.result.groups[this.currentGroupIdx];
            let testResults: TestResult[] = [];

            if (currentGroup && currentGroup.tests)
                for (let i = this.currentTestIdx + 1; i < currentGroup.tests.length; i++) {
                    currentGroup.tests[i].state = TestResultState.SKIPPED;
                    testResults.push(currentGroup.tests[i]);
                }
            this.callResultUpdateHandler(testResults);

            this.currentGroupIdx++;
            this.currentTestIdx = -1;
            this.currentContext = null;
        }

        kill(tfVerbose: boolean): void {
            this.currentTestRunner && this.currentTestRunner.kill(tfVerbose);
        }

        clean(): void {
            this.currentGroupIdx = null;
            this.currentTestIdx = null;
            this.currentContext = null;
            this.currentTestCase = null;
            this.currentTestRunner = null;

            this.result = null;
            this._groupResultMap = null;
            this._testResultMap = null;

            this.resultUpdateCalback = null;
        }

        callResultUpdateHandler(updated: GroupResult | TestResult | TestResult[]): void {
            setTimeout( () => {
                this.resultUpdateCalback && this.resultUpdateCalback.resultUpdateHandler(this.result, updated);
                }, Const.DEFAULT_ASYNC_DELAY);
        }

        updateTestState_Running(testCase: TestCase): void {
            this.currentTestCase = testCase;
            let testResult: TestResult = this._testResultMap.get(testCase);
            if (testResult) {
                testResult.state = TestResultState.WORKING;
                testResult.parent.state = testResult.state;
            }
            this.callResultUpdateHandler(testResult);
        }

        updateTestState_Success(test: AsyncTest): void {
            let testResult: TestResult = this._testResultMap.get(this.currentTestCase);
            if (testResult) {
                testResult.state = TestResultState.SUCCESS;
                this._updateDetails(testResult, test.executionTime, true);
            }
            this.currentTestCase = null;
            this.callResultUpdateHandler(testResult);
        }

        updateTestState_Failure(test: AsyncTest, code: asyncUtils6.TaskFailureCode, error: Error): void {
            let testResult: TestResult = this._testResultMap.get(this.currentTestCase);
            if (testResult) {
                testResult.state = this._taskFailureCode2TestResultState(code);
                testResult.errorMsg = error.message;
                this._updateDetails(testResult, test.executionTime, false);
            }
            this.currentTestCase = null;
            this.callResultUpdateHandler(testResult);

            if (code === asyncUtils6.TaskFailureCode.KILLED)
                this.clean();
        }

        updateGroupState_Failure(group: TestGroup, code: asyncUtils6.TaskFailureCode, error: Error): void {
            let groupResult: GroupResult = this._groupResultMap.get(group);
            if (groupResult) {
                groupResult.state = this._taskFailureCode2TestResultState(code);
                groupResult.errorMsg = error.message;
                groupResult.failedCount++;
                groupResult.root.failedCount++;
            }
            this.currentTestCase = null;
            this.callResultUpdateHandler(groupResult);

            if (code === asyncUtils6.TaskFailureCode.KILLED)
                this.clean();
        }

        updateTestCaseState_Failure(testCase: TestCase, code: asyncUtils6.TaskFailureCode, error: Error): void {
            let testResult: TestResult = this._testResultMap.get(testCase);
            if (testResult) {
                testResult.state = this._taskFailureCode2TestResultState(code);
                testResult.errorMsg = error.message;
                this._updateDetails(testResult, 0, false);
            }
            this.currentTestCase = null;
            this.callResultUpdateHandler(testResult);

            if (code === asyncUtils6.TaskFailureCode.KILLED)
                this.clean();
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
                    this._groupResultMap.set(group, groupResult);

                    if (group.testCases)
                        for (let j = 0; j < group.testCases.length; j++) {
                            let testCase: TestCase = group.testCases[j];
                            let testResult: TestResult = new TestResult();
                            testResult.testId = testCase.testId;
                            testResult.parent = groupResult;
                            testResult.timeLimit = testCase.timeLimit;
                            groupResult.tests.push(testResult);

                            this._testResultMap.set(testCase, testResult);
                            this.result.allTestCount++;
                            groupResult.allTestCount++;
                        }
                }
        }

        private _taskFailureCode2TestResultState(code: asyncUtils6.TaskFailureCode): TestResultState {
            if (code === asyncUtils6.TaskFailureCode.TIMEOUT)
                return TestResultState.TIMEOUT;

            else if (code === asyncUtils6.TaskFailureCode.KILLED)
                return TestResultState.KILLED;

            else
                return TestResultState.FAILURE;
        }
    }


    class AssertError extends Error {
        constructor(public message: string) { super(message) };
    }

    class TestCase {
        constructor(public testId: string, public timeLimit: number, public testClassPrototype: Function) { }
    }

    class TestGroup {
        constructor(public groupId: string, public contextFactory: ITestContextFactory, public testCases: TestCase[]) { }
    }

    class INextTestMeta {
        constructor(public testCase: TestCase, public test: AsyncTest) { };
    }
}