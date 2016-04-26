///<reference path="TestCommons.ts"/>

"use strict";

namespace HsTest {

    var resultIdGen: number = 0;
    function resultId(): string {
        return 'test_' + ( resultIdGen++ ).toString();
    }

    export class TestSequenceRunner {
        private hsGameCtx: HsLogic.HsGameCtx;
        private testSeqResult: TestSequenceResult;
        private testSeq: TestSequence;
        private actionTestRunner: ActionTestRunner;


        constructor( protected resolve: CommonUtils.PromiseResolve<TestSequenceResult> ) {
            let self: TestSequenceRunner = this;
            this.actionTestRunner = new ActionTestRunner(
                ( state: TestSequenceResultState, error: Error, results: ActionTestResult[] ) => {
                    self.onActionTestRunnerFinished( state, error, results )
                });
        }


        execute( testSeq: TestSequence, hsGameCtx?: HsLogic.HsGameCtx ) {
            let actions: ActionType[];
            this.testSeq = testSeq;
            this.hsGameCtx = hsGameCtx || testSeq.hsGameCtxBuilder();
            actions = this.testSeq.actions( this.hsGameCtx );

            this.testSeqResult = {
                id: resultId(),
                testTitle: DbgUtils.testTitle( actions ) + ':',
                testResults: [],
                state: null,
                error: null,
                consequencesMonitorExcludes: this.testSeq.actionMonitor ? this.testSeq.actionMonitor.consequencesMonitorExcludes || [] : []
            }

            this.actionTestRunner.execute( actions, this.hsGameCtx, this.testSeq.actionMonitor );
        }


        onActionTestRunnerFinished( state: TestSequenceResultState, error: Error, results: ActionTestResult[] ): void {
            this.testSeqResult.testResults = results;
            this.testSeqResult.error = error;

            if ( state === TestSequenceResultState.PASSED )
                this.resolveTests();
            else
                this.closeTest( state );
        }


        private resolveTests(): void {
            let testResult: ActionTestResult;
            for ( let test of this.testSeq.tests ) {

                testResult = {
                    id: resultId(),
                    actionClass: test.name || 'TEST',
                    eventClass: '',
                    chain: [test.name || 'TEST'],
                    state: TestResultState.RESOLVING,
                    param: { before: null, after: null }
                };

                this.testSeqResult.testResults.push( testResult );

                try {
                    if ( test.check( this.hsGameCtx ) ) {
                        testResult.state = TestResultState.PASSED;
                    } else {
                        testResult.state = TestResultState.FAILED;
                        testResult.chain = [typeof ( test.errorMsg ) === 'string' ? test.errorMsg : ( <any>test.errorMsg )( this.hsGameCtx )];
                        this.closeTest( TestSequenceResultState.FAILED );
                        return;
                    }
                } catch ( error ) {
                    this.testSeqResult.error = error;
                    this.closeTest( TestSequenceResultState.TEST_ERROR );
                    return;
                }
            }
            this.closeTest( TestSequenceResultState.PASSED );
        }


        private closeTest( state: TestSequenceResultState ): void {
            this.testSeqResult.state = state;
            this.resolve( this.testSeqResult );
        }
    }



    export class ActionTestRunner {
        private hsGameCtx: HsLogic.HsGameCtx;
        private stack: jsAction.ActionStack;
        private currentTestIdx: number = 0;
        private passedCount: number = 0;
        private actionMonitor: ActionMonitor;
        private results: ActionTestResult[] = [];


        constructor( private callback: ( state: TestSequenceResultState, error: Error, results: ActionTestResult[] ) => void ) {
            this.buildStack();
        }


        execute( actions: ActionType[], hsGameCtx: HsLogic.HsGameCtx, actionMonitor: ActionMonitor ) {
            this.hsGameCtx = hsGameCtx;
            this.actionMonitor = actionMonitor;

            this.stack.putActions( actions );
            this.stack.resolveTopAction( this.hsGameCtx );
        }


        private buildStack(): void {
            let self: ActionTestRunner = this;

            this.stack = new jsAction.ActionStack(
                ( action, resolvable ) => { self._onResolving( action, resolvable ) },
                ( action, executionTime ) => { self._onResolved( action, executionTime ) },
                ( action, error, executionTime ) => { self._onError( action, error, executionTime ) }
            );
        }


        private _onResolving( action: ActionType, resolvable: boolean ): void {
            if ( this.actionMonitor )
                this.results.push( {
                    id: resultId(),
                    actionClass: action.className,
                    eventClass: action instanceof HsLogic.DispatchEvent ? ClassUtils.getNameOfClass( action.event ) : '',
                    chain: DbgUtils.actionChainStr3( action, DbgUtils.dbgActionTitle ),
                    state: resolvable ? TestResultState.RESOLVING : TestResultState.NOT_RESOLVABLE,
                    param: {
                        before: this.getParamFrom( action ),
                        after: null
                    }
                });
        }


        private _onResolved( action: ActionType, executionTime: number ): void {
            if ( this.actionMonitor ) {
                let testResult: ActionTestResult = this.lastTestResult();
                testResult.param.after = this.getParamFrom( action );
                testResult.executionTime = executionTime;

                try {
                    testResult.state = this.performTest( action );
                    if ( testResult.state === TestResultState.PASSED )
                        this.passedCount++;
                } catch ( error ) {
                    testResult.state = TestResultState.TEST_ERROR;
                    this.closeTest( TestSequenceResultState.TEST_ERROR, error );
                    return;
                }
            }

            this.resolveNext();
        }


        private _onError( action: ActionType, error: Error, executionTime: number ): void {
            if ( this.actionMonitor ) {
                let testResult: ActionTestResult = this.lastTestResult();
                testResult.state = TestResultState.RESOLVING_ERROR;
                testResult.param.after = this.getParamFrom( action );
                testResult.executionTime = executionTime;
            }

            this.closeTest( TestSequenceResultState.RESOLVING_ERROR, error );
        }


        private resolveNext(): void {
            if ( this.actionMonitor
                && this.lastTestResult().state === TestResultState.FAILED )
                this.closeTest( TestSequenceResultState.FAILED, null );

            else if ( this.stack.isEmpty()
                && this.actionMonitor
                && this.actionMonitor.actionTests.length !== this.passedCount )
                this.closeTest( TestSequenceResultState.UNRESOLVED_TEST_LEFT, null );

            else if ( this.stack.isEmpty() )
                this.closeTest( TestSequenceResultState.PASSED, null )

            else
                this.stack.resolveTopAction( this.hsGameCtx );
        }


        private closeTest( state: TestSequenceResultState, error: Error ): void {
            this.callback( state, error, this.results );
        }


        private performTest( action: jsAction.IActionType ): TestResultState {
            let actionTest: ActionTest = this.actionMonitor.actionTests[this.currentTestIdx] || null;

            if ( actionTest && action instanceof actionTest.actionClass && actionTest.testable( action, this.hsGameCtx ) ) {
                this.currentTestIdx++;
                return actionTest.test( action, this.hsGameCtx ) ? TestResultState.PASSED : TestResultState.FAILED;
            }
            else
                return TestResultState.UNTESTED;
        }


        private getParamFrom( action: jsAction.IActionType ): HsLogic.IActionParam {
            if ( action instanceof HsLogic.DispatchEvent )
                return JSON.parse( DbgUtils.model2JSON( action.event ) );
            if ( action instanceof HsLogic.Action )
                return JSON.parse( DbgUtils.model2JSON( action.param ) );
            else
                return null;
        }


        private lastTestResult(): ActionTestResult {
            return this.results[this.results.length - 1];
        }
    }
}