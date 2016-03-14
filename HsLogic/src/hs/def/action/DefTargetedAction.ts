"use strict";

namespace Def {

    export type FActionBuilder = ( source: HsSource, targets: ITargets, gameCtx: GameCtx ) => Action[];

    export interface ISingleTargetParam {
        availableTargets: IDefTarget,
        actionBuilder: FActionBuilder
    }


    export class SingleTargetAction extends IDefTargetedAction<ITargets> {
        acquireTargets( source: HsSource, targets: ITargets, gameCtx: GameCtx ): Action {
            return null;
        }

        actions( source: HsSource, targets: ITargets, gameCtx: GameCtx ): Action[] {
            return this.param.actionBuilder( source, targets, gameCtx );
        }

        constructor( public param: ISingleTargetParam ) { super() }
    }
}