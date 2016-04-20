"use strict";

namespace HsTest {


    interface ValidatorContext {
        errors: string[],
        passed: number
    }


    interface ContextValidator {

        timeLimit?: number,

        respondsTo: HsLogic.ActionType,

        resolvableAction?: ( action: HsLogic.ActionType, hsGameCtx: HsLogic.HsGameCtx ) => boolean

        validate: ( action: HsLogic.ActionType, hsGameCtx: HsLogic.HsGameCtx, validatorCtx: ValidatorContext ) => void;
    }


    interface HsTest {
        hsGameCtxBuilder: () => HsLogic.HsGameCtx,
        action: () => HsLogic.ActionType,
        validators: ContextValidator[]
    }



    class TestRunner {
        private hsGameCtx: HsLogic.HsGameCtx;
        private stack: jsAction.ActionStack;
        private cursor: number = -1;

        private runNext(): void {

        }

        constructor( public test: HsTest ) {
            this.hsGameCtx = test.hsGameCtxBuilder();
            this.stack = new jsAction.ActionStack(
                ( action, resolvable ) => { },
                ( action, executionTime ) => { },
                ( action, error, executionTime ) => { }
            );
        }
    }



    class TestEngine {
    }

}