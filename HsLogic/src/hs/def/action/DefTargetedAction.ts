"use strict";

namespace Def {

    export type FActionBuilder = ( source: HsSource, targets: ITargets, gameCtx: GameCtx ) => Action[];

    export interface ISingleTargetParam {
        availableTargets: IDefTarget,
        actionBuilder: FActionBuilder
    }


    export class SingleTargetAction extends IDefTargetedAction<ITargets> {
        acquireTargets( source: HsSource, targets: ITargets, gameCtx: GameCtx ): Action {
            return new HsLogic.MakeAChoiceAtRandom( {
                source: source,
                require: HsLogic.REQUIRE.YES,
                props: { amount: 1 },
                sets: {
                    source: this.param.availableTargets.buildSet( source, gameCtx ),
                    result: targets.targets
                }
            });
        }

        actions( source: HsSource, targets: ITargets, gameCtx: GameCtx ): Action[] {
            return this.param.actionBuilder( source, targets, gameCtx );
        }

        constructor( public param: ISingleTargetParam ) { super() }
    }
}