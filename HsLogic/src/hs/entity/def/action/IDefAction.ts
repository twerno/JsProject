"use strict";

namespace HSLogic {


    export type IDefActionFactory = IActionFactory<HsGameCtx, HsActionParam> | IActionFactory<HsGameCtx, HsActionParam>[];
    export type IDefTargetedActionFactory = ITargetedActionFactory<HsGameCtx, ParamWithTargetFilter> | ITargetedActionFactory<HsGameCtx, ParamWithTargetFilter>[];

    export interface IDefAction {
        actions: IDefActionFactory
    }

    export class DefAction {
        constructor(public actionBuilder: IDefActionFactory) { }
    }



    export interface IDefTargetedAction {
        altTargets: DefProperTarget,
        actions: IDefTargetedActionFactory
    }

    export class DefTargetedAction {
        constructor(public altTargets: DefProperTarget, public actionBuilder: IDefTargetedActionFactory) { }
    }



    export type IDefActions = DefAction | DefAction[] | DefTargetedAction | DefTargetedAction[];



    export function DEF_ACTION(def: IDefAction): DefAction {
        return new DefAction(def.actions);
    }

    export function DEF_TARGETED_ACTION(def: IDefTargetedAction): DefTargetedAction {
        return new DefTargetedAction(def.altTargets, def.actions);
    }
}