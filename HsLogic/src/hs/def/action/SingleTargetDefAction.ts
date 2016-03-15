"use strict";

namespace Def {

    export interface ITarget extends ITargets {
        target: HsLogic.HsEntity;
    }

    export interface ISingleTargetParam<T extends HsLogic.HsEntity> {
        availableTargets: IDefTarget,
        actionBuilder: FSingleTargetActionBuilder<T>
    }


    export class SingleTargetDefAction<T extends HsLogic.HsEntity> extends IDefTargetedAction<ITarget> {

        protected getSingleTarget( targets: ITargets ): T {
            if ( targets
                && ( targets.targets || [] ).length > 0 )
                return <T>targets.targets[0];
            else
                return null;
        }

        acquireTargets( param: HsCancelableParam, targets: ITarget, gameCtx: GameCtx ): Action {
            return gameCtx.actionFactory.makeAChoice.singleTarget( {
                source: param.source,
                cancelAction: param.cancelAction,
                sets: {
                    source: this.param.availableTargets.buildSet( param.source, gameCtx ),
                    result: targets.target
                },
            })
        }

        actions( source: HsSource, targets: ITargets, gameCtx: GameCtx ): Action[] {
            return this.param.actionBuilder( source, this.getSingleTarget( targets ), gameCtx );
        }

        constructor( public param: ISingleTargetParam<T> ) { super() }
    }
}