///<reference path="TestCommons.ts"/>

"use strict";

namespace HsTest {


    export class TestSequenceRunner {
        private hsGameCtx: HsLogic.HsGameCtx;
        private stack: jsAction.ActionStack;
        private testSeqResult: TestSequenceResult;
        private currentTestIdx: number = 0;
        private testSeq: TestSequence;
        private passedCount: number = 0;


        constructor( protected resolve: CommonUtils.PromiseResolve<TestSequenceResult> ) {
            this.buildStack();
        }


        execute( testSeq: TestSequence, hsGameCtx?: HsLogic.HsGameCtx ) {
            this.hsGameCtx = hsGameCtx || testSeq.hsGameCtxBuilder();
            this.testSeq = testSeq;

            for ( let a of this.testSeq.actions( this.hsGameCtx ) )
                this.stack.putOnTop( a );

            this.testSeqResult = {
                testClass: ClassUtils.getNameOfClass( testSeq ),
                testResults: [],
                state: null,
                error: null
            }

            this.stack.resolveTopAction( this.hsGameCtx );
        }


        private buildStack(): void {
            let self: TestSequenceRunner = this;

            this.stack = new jsAction.ActionStack(
                ( action, resolvable ) => { self._onResolving( action, resolvable ) },
                ( action, executionTime ) => { self._onResolved( action, executionTime ) },
                ( action, error, executionTime ) => { self._onError( action, error, executionTime ) }
            );
        }

        private _onResolving( action: ActionType, resolvable: boolean ): void {
            if ( !DbgUtils.excludedAction( action, this.testSeq.consequencesMonitorExcludes ) )
                this.testSeqResult.testResults.push( {
                    actionClass: action.className,
                    chain: DbgUtils.actionChainStrExclude( action, this.testSeq.consequencesMonitorExcludes ),
                    state: resolvable ? TestResultState.RESOLVING : TestResultState.NOT_RESOLVABLE,
                    param: {
                        before: this.getParamFrom( action ),
                        after: null
                    }
                });
        }

        private _onResolved( action: ActionType, executionTime: number ): void {
            if ( !DbgUtils.excludedAction( action, this.testSeq.consequencesMonitorExcludes ) ) {
                let testResult: TestResult = this.lastTestResult();
                testResult.param.after = this.getParamFrom( action );
                testResult.executionTime = executionTime;

                try {
                    testResult.state = this.performTest( action );
                    if ( testResult.state === TestResultState.PASSED )
                        this.passedCount++;
                } catch ( error ) {
                    testResult.state = TestResultState.TEST_ERROR;
                    this.testSeqResult.error = error;

                    this.closeTest( TestSequenceResultState.TEST_ERROR );
                    return;
                }
            }

            this.resolveNext();
        }

        private _onError( action: ActionType, error: Error, executionTime: number ): void {
            if ( !DbgUtils.excludedAction( action, this.testSeq.consequencesMonitorExcludes ) ) {
                let testResult: TestResult = this.lastTestResult();
                testResult.state = TestResultState.RESOLVING_ERROR;
                testResult.param.after = this.getParamFrom( action );
                testResult.executionTime = executionTime;
            }
            this.testSeqResult.error = error;

            this.closeTest( TestSequenceResultState.RESOLVING_ERROR );
        }



        private resolveNext(): void {
            if ( this.lastTestResult().state === TestResultState.FAILED )
                this.closeTest( TestSequenceResultState.FAILED );

            else if ( this.stack.isEmpty() && this.testSeq.tests.length === this.passedCount )
                this.closeTest( TestSequenceResultState.PASSED );

            else if ( this.stack.isEmpty() && this.testSeq.tests.length !== this.passedCount )
                this.closeTest( TestSequenceResultState.UNRESOLVED_TEST_LEFT );

            else
                this.stack.resolveTopAction( this.hsGameCtx );
        }


        private closeTest( state: TestSequenceResultState ): void {
            this.testSeqResult.state = state;
            this.resolve( this.testSeqResult );
        }



        private performTest( action: jsAction.IActionType ): TestResultState {
            let unitTest: Test = this.testSeq.tests[this.currentTestIdx] || null;

            if ( unitTest && action instanceof unitTest.toBeTested && unitTest.testable( action, this.hsGameCtx ) ) {
                this.currentTestIdx++;
                return unitTest.test( action, this.hsGameCtx ) ? TestResultState.PASSED : TestResultState.FAILED;
            }
            else
                return TestResultState.UNTESTED;
        }


        private getParamFrom( action: jsAction.IActionType ): HsLogic.IActionParam {
            if ( action instanceof HsLogic.Action )
                return JSON.parse( DbgUtils.model2JSON( action.param ) );
            else
                return null;
        }


        private lastTestResult(): TestResult {
            return this.testSeqResult.testResults[this.testSeqResult.testResults.length - 1];
        }
    }
}