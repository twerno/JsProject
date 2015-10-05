//https://github.com/Steve-Fenton/tsUnit
///<reference path="../../../JSProject/dist/jsProject.d.ts"/>
///<reference path="TestClass.ts"/>
///<reference path="TestResultPainter.ts"/>
	
module tsUnit {
    export class Test {
        public privateMemberPrefix = '_';
        private testResult: TestResult = null;

        private tests: TestDefintion[] = [];
        private testRunLimiter: TestRunLimiter;
        private reservedMethodNameContainer: TestClass = new AsyncTestClass();

        public onResultChange: (result: TestResult) => void = null;



        constructor(...testModules: any[]) {
            this.createTestLimiter();

            for (var i = 0; i < testModules.length; i++) {
                var testModule = testModules[i];
                for (var testClass in testModule) {
                    this.addTestClass(new testModule[testClass](), testClass);
                }
            }
        }



        addTestClass(testClass: TestClass, name: string = 'Tests'): void {
            this.tests.push(new TestDefintion(testClass, name));
        }



        private _internalOnTestReady(asyncTestClass: AsyncTestClass, testResult: TestResult, testsGroupName: string): void {
            this.testResult.asyncTestMap[testsGroupName] = AsyncTestState.TESTING;
            this.onResultChange || this.onResultChange(this.testResult);
            this.executeTestClass(testResult, asyncTestClass, testsGroupName, this.testRunLimiter);
        }



        private _internalOnAsyncSetUpFailure(asyncTest: AsyncTestClass, testResult: TestResult, testsGroupName: string, msg?: string): void {
            this.testResult.asyncTestMap[testsGroupName] = AsyncTestState.FAILED;
            this.onResultChange || this.onResultChange(this.testResult);
            testResult.errors.push(new TestDescription(testsGroupName, this.getNameOfClass(asyncTest), null, msg));
        }



        private getNameOfClass(inputClass: {}) {
            // see: https://www.stevefenton.co.uk/Content/Blog/Date/201304/Blog/Obtaining-A-Class-Name-At-Runtime-In-TypeScript/
            var funcNameRegex = /function (.{1,})\(/;
            var results = (funcNameRegex).exec((<any> inputClass).constructor.toString());
            return (results && results.length > 1) ? results[1] : '';
        }



        run(testRunLimiter: ITestRunLimiter = null): void {
            var testContext = new TestContext();
            this.testResult = new TestResult();

            if (testRunLimiter == null) {
                testRunLimiter = this.testRunLimiter;
            }

            for (var i = 0; i < this.tests.length; ++i) {
                var testClass = this.tests[i].testClass;
                var testsGroupName = this.tests[i].name;

                if (testRunLimiter && !testRunLimiter.isTestsGroupActive(testsGroupName)) {
                    continue;
                }

                if (testClass instanceof AsyncTestClass) {
                    let runner: AsyncTestRunner = new AsyncTestRunner(testClass, this.testResult, testsGroupName,
                        this._internalOnTestReady, this._internalOnAsyncSetUpFailure);
                    runner.runAsync();

                    this.testResult.asyncTestMap[testsGroupName] = AsyncTestState.SETTING_UP;
                    this.onResultChange || this.onResultChange(this.testResult);
                } else
                    this.executeTestClass(this.testResult, testClass, testsGroupName, testRunLimiter);
            }
            //            return this.testResult;
        }



        private executeTestClass(testResult: TestResult, testClass: TestClass, testsGroupName: string, testRunLimiter: ITestRunLimiter): void {
            let dynamicTestClass = <any>testClass;
            let parameters: any[][] = null;

            for (var unitTestName in testClass) {
                if (this.isReservedFunctionName(unitTestName)
                    || (unitTestName.substring(0, this.privateMemberPrefix.length) === this.privateMemberPrefix)
                    || (typeof dynamicTestClass[unitTestName] !== 'function')
                    || (testRunLimiter && !testRunLimiter.isTestActive(unitTestName))) {
                    continue;
                }

                if (typeof dynamicTestClass[unitTestName].parameters !== 'undefined') {
                    parameters = dynamicTestClass[unitTestName].parameters;
                    for (var parameterIndex = 0; parameterIndex < parameters.length; parameterIndex++) {
                        if (testRunLimiter && !testRunLimiter.isParametersSetActive(parameterIndex)) {
                            continue;
                        }

                        this.runSingleTest(testResult, testClass, unitTestName, testsGroupName, parameters, parameterIndex);
                    }
                } else {

                    this.runSingleTest(testResult, testClass, unitTestName, testsGroupName);
                }
            }
        }



        private createTestLimiter() {
            try {
                if (typeof window !== 'undefined') {
                    this.testRunLimiter = new TestRunLimiter();
                }
            } catch (ex) { }
        }



        private isReservedFunctionName(functionName: string): boolean {
            for (var prop in this.reservedMethodNameContainer) {
                if (prop === functionName) {
                    return true;
                }
            }
            return false;
        }



        private runSingleTest(testResult: TestResult, testClass: TestClass, unitTestName: string, testsGroupName: string, parameters: any[][] = null, parameterSetIndex: number = null) {
            if (typeof testClass['setUp'] === 'function') {
                testClass['setUp']();
            }

            try {
                var dynamicTestClass: any = testClass;
                var args = (parameterSetIndex !== null) ? parameters[parameterSetIndex] : null;
                dynamicTestClass[unitTestName].apply(testClass, args);

                testResult.passes.push(new TestDescription(testsGroupName, unitTestName, parameterSetIndex, 'OK'));
                this.onResultChange || this.onResultChange(this.testResult);
            } catch (err) {
                testResult.errors.push(new TestDescription(testsGroupName, unitTestName, parameterSetIndex, err.toString()));
                this.onResultChange || this.onResultChange(this.testResult);
            }

            if (typeof testClass['tearDown'] === 'function') {
                testClass['tearDown']();
            }
        }
    }



    export interface ITestRunLimiter {
        isTestsGroupActive(groupName: string): boolean;
        isTestActive(testName: string): boolean;
        isParametersSetActive(paramatersSetNumber: number): boolean;
    }



    export interface IThrowsParameters {
        fn: () => void;
        message?: string;
        errorString?: string;
    }



    class TestRunLimiterRunAll implements ITestRunLimiter {
        isTestsGroupActive(groupName: string): boolean {
            return true;
        }

        isTestActive(testName: string): boolean {
            return true;
        }

        isParametersSetActive(paramatersSetNumber: number): boolean {
            return true;
        }
    }



    class TestRunLimiter implements ITestRunLimiter {
        private groupName: string = null;
        private testName: string = null;
        private parameterSet: number = null;

        constructor() {
            this.setRefreshOnLinksWithHash();
            this.translateStringIntoTestsLimit(window.location.hash);
        }

        public isTestsGroupActive(groupName: string): boolean {
            if (this.groupName === null) {
                return true;
            }

            return this.groupName === groupName;
        }

        public isTestActive(testName: string): boolean {
            if (this.testName === null) {
                return true;
            }

            return this.testName === testName;
        }

        public isParametersSetActive(paramatersSet: number): boolean {
            if (this.parameterSet === null) {
                return true;
            }

            return this.parameterSet === paramatersSet;
        }

        private setRefreshOnLinksWithHash() {
            var previousHandler = window.onhashchange;

            window.onhashchange = function(ev: HashChangeEvent) {
                window.location.reload();

                if (typeof previousHandler === 'function') {
                    previousHandler(ev);
                }
            };
        }

        private translateStringIntoTestsLimit(value: string) {
            var regex = /^#([_a-zA-Z0-9]+)((\/([_a-zA-Z0-9]+))(\(([0-9]+)\))?)?$/
            var result = regex.exec(value);

            if (result === null) {
                return;
            }

            if (result.length > 1 && !!result[1]) {
                this.groupName = result[1];
            }

            if (result.length > 4 && !!result[4]) {
                this.testName = result[4];
            }

            if (result.length > 6 && !!result[6]) {
                this.parameterSet = parseInt(result[6], 10);
            }
        }
    }



    class TestDefintion {
        constructor(public testClass: TestClass, public name: string) {
        }
    }

    export class TestDescription {
        constructor(public testName: string, public funcName: string, public parameterSetNumber: number, public message: string) {
        }
    }

    export enum AsyncTestState { SETTING_UP, TESTING, FAILED }
    export interface AsyncTestMap { [key: string]: AsyncTestState }

    export class TestResult {
        public passes: TestDescription[] = [];
        public errors: TestDescription[] = [];
        public asyncTestMap: AsyncTestMap = {};
    }


    class AsyncTestRunner {

        private runner: asyncRunner.AsyncMethodRunner = null;

        constructor(
            public asyncTest: AsyncTestClass,
            public testResult: TestResult,
            public testsGroupName: string,
            public onTestReady: (asyncTest: AsyncTestClass, testResult: TestResult, testsGroupName: string) => void,
            public onSetUpFailure: (asyncTest: AsyncTestClass, testResult: TestResult, testsGroupName: string, msg?: string) => void) {
        }

        runAsync(): void {
            this.runner.kill();
            this.runner = null;
            this.runner = new asyncRunner.AsyncMethodRunner(
                this.asyncTest.asyncSetUp,
                (task: asyncRunner.IAsyncTask, result?: Object): void => {
                    this.onTestReady(this.asyncTest, this.testResult, this.testsGroupName)
                },
                (task: asyncRunner.IAsyncTask, code: asyncRunner.AsyncTaskFailureCode, msg?: string, details?: Object): void => {
                    this.onSetUpFailure(this.asyncTest, this.testResult, this.testsGroupName, msg);

                });

            this.runner.runAsync();
        }
    }
}