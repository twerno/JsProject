///<reference path="TestCommons.ts"/>

"use strict";

namespace HsTest {

    export class TestSequenceRunner {
        private hsGameCtx: HsLogic.HsGameCtx;
        private stack: jsAction.ActionStack;
        private testSeqResult: TestSequenceResult;
        private currentTestIdx: number = 0;
        private test: TestSequence;


        private resolveNext(): void {
            if ( this.stack.isEmpty )
                this.closeTest();
            else
                this.stack.resolveTopAction( this.hsGameCtx );
        }


        private closeTest(): void {
            let unitTestResult: TestResult = this.testSeqResult.testResults[this.testSeqResult.testResults.length - 1];
            if ( unitTestResult.state === TestResultState.RESOLVING )
                unitTestResult.state = TestResultState.UNTESTED;

            this.resolve( this.testSeqResult );
        }


        private performTest( action: jsAction.IActionType ): TestResultState {
            let unitTest: Test = this.test.tests[this.currentTestIdx];

            if ( action instanceof unitTest.respondsTo && unitTest.testable( action, this.hsGameCtx ) ) {
                this.currentTestIdx++;
                return unitTest.test( action, this.hsGameCtx ) ? TestResultState.PASSED : TestResultState.FAILED;
            }
            else
                return TestResultState.UNTESTED;
        }


        private getParamFrom( action: jsAction.IActionType ): HsLogic.IActionParam {
            if ( action instanceof HsLogic.Action )
                return JSON.parse( JSON.stringify( action.param ) );
            else
                return null;
        }


        private buildStack(): void {
            let self: TestSequenceRunner = this;

            this.stack = new jsAction.ActionStack(

                //onResolving
                ( action, resolvable ) => {
                    self.testSeqResult.testResults.push( {
                        actionClass: action.className,
                        state: resolvable ? TestResultState.RESOLVING : TestResultState.NOT_RESOLVABLE,
                        param: {
                            before: self.getParamFrom( action ),
                            after: null
                        }
                    });
                },

                //onResolved
                ( action, executionTime ) => {
                    let unitTestResult: TestResult = self.testSeqResult.testResults[self.testSeqResult.testResults.length - 1];
                    unitTestResult.param.after = self.getParamFrom( action );
                    unitTestResult.executionTime = executionTime;

                    try {
                        unitTestResult.state = self.performTest( action );
                        self.resolveNext();
                    } catch ( error ) {
                        unitTestResult.state = TestResultState.TEST_ERROR;
                        self.testSeqResult.error = error;

                        self.closeTest();
                    }
                },

                //onError
                ( action, error, executionTime ) => {
                    let unitTestResult: TestResult = self.testSeqResult.testResults[self.testSeqResult.testResults.length - 1];
                    unitTestResult.state = TestResultState.RESOLVING_ERROR;
                    unitTestResult.param.after = self.getParamFrom( action );
                    unitTestResult.executionTime = executionTime;
                    self.testSeqResult.error = error;

                    self.closeTest();
                }
            );
        }


        constructor( protected resolve: CommonUtils.PromiseResolve<TestSequenceResult> ) {
            this.buildStack();
        }


        execute( test: TestSequence, hsGameCtx?: HsLogic.HsGameCtx ) {
            this.hsGameCtx = hsGameCtx || test.hsGameCtxBuilder();
            this.test = test;
        }
    }
}