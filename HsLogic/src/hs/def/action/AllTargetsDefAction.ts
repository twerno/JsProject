"use strict";

namespace Def {

    export interface IAllTargetsParam<T extends HsLogic.HsEntity> {
        availableTargets: IDefTarget,
        actionBuilder: FTargetsActionBuilder<T>
    }


    export class AllTargetsDefAction<T extends HsLogic.HsEntity> extends IDefTargetedAction<ITargets> {

        protected getAllTargets( targets: ITargets ): T[] {
            return <T[]>( ( targets && targets.targets ) || [] );
        }

        acquireTargets( param: HsCancelableParam, targets: ITargets, gameCtx: GameCtx ): Action {
            targets.targets = this.param.availableTargets.buildSet( param.source, gameCtx );
            return null;
        }

        actions( source: HsSource, targets: ITargets, gameCtx: GameCtx ): Action[] {
            return this.param.actionBuilder( source, this.getAllTargets( targets ), gameCtx );
        }

        constructor( public param: IAllTargetsParam<T> ) { super() }
    }
}