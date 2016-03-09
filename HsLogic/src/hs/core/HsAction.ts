///<reference path="../../core/action/IAction.ts"/>
///<reference path="../../core/action/IAction.ts"/>
///<reference path="HsGameContext.ts"/>
///<reference path="../../core/action/IActionContext.ts"/>


"use strict";

namespace HSLogic {

    export type PromiseOfActions = Promise<jsLogic.IAction<HsGameCtx>[]>;

    export interface HsActionParam extends jsLogic.IActionParam { }

    export abstract class HsAction<P extends HsActionParam> extends jsLogic.IAction<HsGameCtx> {

        constructor(public param: P) { super(param.sourceAction) }

        abstract resolve(_this_: jsLogic.IAction<HsGameCtx>, gameCtx: HsGameCtx): PromiseOfActions;
    }

    export abstract class HsBaseAction extends jsLogic.SimpleAction<HsGameCtx> { };

    export abstract class HsActionEvent<P extends HsActionParam> extends jsLogic.ActionEvent<HsGameCtx, P> { };

}