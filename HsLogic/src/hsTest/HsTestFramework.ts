"use strict";

namespace HsTest {

    enum CtxValidatorState {
        TESTING, VALID, ERROR
    }

    interface CtxValidatorResult {
        actionName: string,
        state: CtxValidatorState,
    }

    interface TestResult {
        testClass: string,
        validations: CtxValidatorResult[]

    }

    //interface ValidatorContext {
    //    errors: string[],
    //    passed: number
    //}


    interface HsGameCtxValidator {

        timeLimit?: number,

        respondsTo: HsLogic.ActionType,

        validatable?: ( action: HsLogic.ActionType, hsGameCtx: HsLogic.HsGameCtx ) => boolean

        validate: ( action: HsLogic.ActionType, hsGameCtx: HsLogic.HsGameCtx, testResult: TestResult ) => void;
    }


    interface HsTest {
        hsGameCtxBuilder: () => HsLogic.HsGameCtx,
        action: () => HsLogic.ActionType,
        validators: HsGameCtxValidator[]
    }



    class TestRunner {
        private hsGameCtx: HsLogic.HsGameCtx;
        private stack: jsAction.ActionStack;
        private cursor: number = -1;




        private runNext(): void {

        }

        constructor( public test: HsTest ) {
            this.hsGameCtx = test.hsGameCtxBuilder();


            var self: TestRunner
            this.stack = new jsAction.ActionStack(
                ( action, resolvable ) => { },
                ( action, executionTime ) => { },
                ( action, error, executionTime ) => { }
            );
        }
    }



    class TestEngine {
        public resolveTest( test: HsTest ): Promise<TestResult> {
            return new Promise<TestResult>(( resolve, reject ) => {

            });
        }
    }

}