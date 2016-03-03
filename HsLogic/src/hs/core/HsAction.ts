///<reference path="../../core/action/IAction.ts"/>


"use strict";

namespace HSLogic {

    export type PromiseOfActions = Promise<jsLogic.IAction<HsGameEnv>[]>;

    export abstract class HsAction extends jsLogic.IAction<HsGameEnv> {
        abstract resolve(_this_: jsLogic.IAction<HsGameEnv>, gameEnv: HsGameEnv): PromiseOfActions;
    };

    export abstract class HsBaseAction extends jsLogic.BaseAction<HsGameEnv> { };

}