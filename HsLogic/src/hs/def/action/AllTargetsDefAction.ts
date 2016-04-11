"use strict";

namespace Def {

    export interface IAllTargetsParam<T extends HsLogic.HsEntity> {
        availableTargets: IDefSetBuilder,
        actionBuilder: FTargetsActionBuilder<T>
    }


    export class AllTargetsDefAction<T extends HsLogic.HsEntity> extends IDefTargetedAction<ITargets> {

        protected getAllTargets( targets: ITargets ): T[] {
            return <T[]>( ( targets && targets.targets ) || [] );
        }

        acquireTargets( param: HsCancelableParam, targets: ITargets, context: HsGameCtx ): Action {
            targets.targets = this.param.availableTargets.buildSet<HsLogic.HsEntity>( param.source, context );
            return null;
        }

        actions( source: ISource, targets: ITargets, context: HsGameCtx ): Action[] {
            return this.param.actionBuilder( source, this.getAllTargets( targets ), context );
        }

        constructor( public param: IAllTargetsParam<T> ) { super() }
    }
}