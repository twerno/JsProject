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
            this.testSeqResult.testResults.push( {
                actionClass: action.className,
                chain: action.chainStr(),
                state: resolvable ? TestResultState.RESOLVING : TestResultState.NOT_RESOLVABLE,
                param: {
                    before: this.getParamFrom( action ),
                    after: null
                }
            });
        }

        private _onResolved( action: ActionType, executionTime: number ): void {
            let unitTestResult: TestResult = this.lastTestResult();
            unitTestResult.param.after = this.getParamFrom( action );
            unitTestResult.executionTime = executionTime;

            try {
                unitTestResult.state = this.performTest( action );
                if ( unitTestResult.state === TestResultState.PASSED )
                    this.passedCount++;
            } catch ( error ) {
                unitTestResult.state = TestResultState.TEST_ERROR;
                this.testSeqResult.error = error;

                this.closeTest( TestSequenceResultState.TEST_ERROR );
                return;
            }

            this.resolveNext();
        }

        private _onError( action: ActionType, error: Error, executionTime: number ): void {
            let unitTestResult: TestResult = this.lastTestResult();
            unitTestResult.state = TestResultState.RESOLVING_ERROR;
            unitTestResult.param.after = this.getParamFrom( action );
            unitTestResult.executionTime = executionTime;
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
                return JSON.parse( JSON.stringify( action.param,
                    ( key, value ): any => {
                        if ( value instanceof jsAction.Entity )
                            return `[${ClassUtils.getNameOfClass( value )}:${value.id}]`;
                        else
                            return value;
                    }) );
            else
                return null;
        }


        private lastTestResult(): TestResult {
            return this.testSeqResult.testResults[this.testSeqResult.testResults.length - 1];
        }
    }
}