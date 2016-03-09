"use strict";

namespace HSLogic {

    export interface IActionFactory<T extends jsLogic.IContext, P extends jsLogic.IActionParam<T>> {
        build(param: P, gameCtx: T): jsLogic.IAction<T>;
    }

    export interface ParamWithTargetFilter extends HsActionParam {
        altTargets: DefTargetFilter[]
    }

    //export interface ITargetedActionFactory<T extends jsLogic.IActionContext, P extends ParamWithTargets> {
    //    build(param: P, gameCtx: T): jsLogic.IAction<T>;
    //}

    export type ITargetedActionFactory<T extends jsLogic.IContext, P extends ParamWithTargetFilter>
        = (sourceAction: jsLogic.IAction<T>, param: P, gameCtx: T) => jsLogic.IAction<T>;

}