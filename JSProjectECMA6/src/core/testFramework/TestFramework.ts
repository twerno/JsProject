///<reference path="../Utils.ts"/>
///<reference path="../commons/AsyncTaskRunner.ts"/>

"use strict";

module testEC6 {


    export enum TestState {NEW, WORKING, FINISHED, FAILED, TIMEOUT}

    export interface ITestResult {
        testId: string;
        state: TestState;
        time: number;
        errorMsg: string;
        timeLimit: number;
    }

    export interface IGroupResult {
        groupId: string;
        state: TestState;
        time: number;
        errorMsg: string;
        timeLimit: number;
        tests: ITestResult[];
    }

    export interface IResult {

    }

    class TestInterruptError extends Error { }




    export class TestContext {

    }

    export interface ITestContextFactory {
        buildTestContext(): TestContext;
    }


    interface TestGroup {
        groupId: string;
        contextFactory: ITestContextFactory;
        testCaseList: Function[];
    }

    interface TestGroupMap { [key: string]: TestGroup}

    interface TestMapCursor {
        currentGroupIdx: number;
        currentTestIdx: number;
        currentContext: Object;
    }

    interface INextTestMeta {
        group: TestGroup, 
        testClass: Function, 
        testContext: Object
    }

    export class TestManager {

        private _groupList: TestGroup[];
        private _testCursor: TestMapCursor = null;

        registerTestChain(groupId: string, contextFactory: ITestContextFactory, testCaseList: Function[]): void {
            let testGroup: TestGroup =  {
                groupId: groupId,
                contextFactory: contextFactory,
                testCaseList: testCaseList
            };

            this._groupList.push(testGroup);
        }


        runTests(): void {
            this._testCursor = {
                currentGroupIdx: 0,
                currentTestIdx: -1,
                currentContext: null
            }
            this._runNextTest();

        }


        private _runNextTest(): void {
            let next: INextTestMeta = this._getNextTest();
            let testCase: TestCase = <TestCase> Object.create(next.testClass);

            try {
                testCase.testContext = next.testContext;
                testCase.run(() => { this._onSuccessHandler() }, (error: Error) => { this._onFailureHandler(error) });

            } catch(error) {
                if (!(error instanceof TestInterruptError)) {
                    this._onFailureHandler(error && error.message || 'Unknown error message');
                }
            }
        }


        private _onSuccessHandler(): void {
            // update results
            this._runNextTest();
        }

        private _onFailureHandler(error: Error): void {
            // update results

            // skip current test group
            this._testCursor.currentGroupIdx++;
            this._testCursor.currentTestIdx = -1;
            this._testCursor.currentContext = null;
            this._runNextTest();
        }

        
        private _getNextTest(): INextTestMeta {
            let group: TestGroup = this._groupList[this._testCursor.currentGroupIdx] || null;

            if (group === null) {
                return {group: null, testClass: null, testContext: null}

            } else if (group.testCaseList.length > ++(this._testCursor.currentTestIdx)) {
                if (this._testCursor.currentContext === null && group.contextFactory) {
                    try {
                        this._testCursor.currentContext = group.contextFactory.buildTestContext() || null;
                    } catch (error) {
                        throw error; //@TODO
                    }
                }

                return {
                    group: group, 
                    testClass: group.testCaseList[this._testCursor.currentTestIdx] || null,
                    testContext: this._testCursor.currentContext
                };
                 
            } else {
                this._testCursor.currentGroupIdx++;
                this._testCursor.currentTestIdx = -1;
                this._testCursor.currentContext = null;

                return this._getNextTest();
            }
        }

    }


    class TestCase extends asyncRunner6.IAsyncTask {

        timeLimit(): number {return 0 }; // 0 -unlimited

        testId(): string { return Utils.getNameOfClass(this) }

        protected runTests(): void {
            throw new Error(`runTests() of test: ${this.testId()} has not been implemented!`);
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
}