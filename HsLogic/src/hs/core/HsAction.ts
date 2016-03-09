///<reference path="../../core/action/IAction.ts"/>


"use strict";

namespace HSLogic {

    export type PromiseOfActions = Promise<jsLogic.IAction<HsGameCtx>[]>;

    export abstract class HsAction extends jsLogic.IAction<HsGameCtx> {
        abstract resolve(_this_: jsLogic.IAction<HsGameCtx>, gameCtx: HsGameCtx): PromiseOfActions;
    };

    export abstract class HsBaseAction extends jsLogic.SimpleAction<HsGameCtx> { };

    export abstract class HsActionEvent<P extends HsActionParam> extends jsLogic.ActionEvent<HsGameCtx, P> { };

}