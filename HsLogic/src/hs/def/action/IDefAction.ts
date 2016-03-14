"use strict";

namespace Def {

    export interface ITargets {
        targets: HSLogic.HsEntity[];
    }


    export abstract class IDefTargetedAction<T extends ITargets> {
        abstract acquireTargets( source: HSLogic.IHsSource, targets: T, gameCtx: HSLogic.HsGameCtx ): jsLogic.IAction<HSLogic.HsGameCtx>;
        abstract actions( source: HSLogic.IHsSource, targets: T, gameCtx: HSLogic.HsGameCtx ): jsLogic.IAction<HSLogic.HsGameCtx>[];
    }


    export type IDefTargetlessAction = ( source: HSLogic.IHsSource, gameCtx: HSLogic.HsGameCtx ) => jsLogic.IAction<HSLogic.HsGameCtx>[];


    export type IDefAction = IDefTargetedAction<ITargets> | IDefTargetlessAction;



    export function isTargetedActionDef<T>( actionDef: any ): actionDef is IDefTargetedAction<T> {
        return actionDef instanceof IDefTargetedAction;
    }



    export function isTargetlessActionDef( actionDef: any ): actionDef is IDefTargetlessAction {
        return actionDef instanceof Function;
    }
}