"use strict";

namespace HSLogic {

    export interface IActionFactory<T extends jsLogic.IExtContext, P extends jsLogic.IActionParam> {
        build(param: P, gameCtx: T): jsLogic.IAction<T>;
    }

    export interface ParamWithTargetFilter extends HsActionParam {
        altTargets: DefTargetSetBuilder[]
    }

    //export interface ITargetedActionFactory<T extends jsLogic.IActionContext, P extends ParamWithTargets> {
    //    build(param: P, gameCtx: T): jsLogic.IAction<T>;
    //}

    export type ITargetedActionFactory<T extends jsLogic.IExtContext, P extends ParamWithTargetFilter>
        = (source: jsLogic.IAction<T>, param: P, gameCtx: T) => jsLogic.IAction<T>;

}