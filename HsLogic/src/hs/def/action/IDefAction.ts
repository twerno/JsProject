"use strict";

namespace Def {

    export type Action = jsLogic.IAction<GameCtx>;

    export interface ITargets {
        targets: HsLogic.HsEntity[];
    }


    export abstract class IDefTargetedAction<T extends ITargets> {
        abstract acquireTargets( source: HsSource, targets: T, gameCtx: GameCtx ): Action;
        abstract actions( source: HsSource, targets: T, gameCtx: GameCtx ): Action[];
    }


    export type IDefTargetlessAction = ( source: HsSource, gameCtx: GameCtx ) => Action[];


    export type IDefAction = IDefTargetedAction<ITargets> | IDefTargetlessAction;



    export function isTargetedActionDef<T>( defAction: any ): defAction is IDefTargetedAction<T> {
        return defAction instanceof IDefTargetedAction;
    }



    export function isTargetlessActionDef( defAction: any ): defAction is IDefTargetlessAction {
        return defAction instanceof Function;
    }
}