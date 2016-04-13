"use strict";

namespace Def {

    export enum PICK_MODE {
        RANDOM, USER_CHOICE
    }

    export interface TargetDefinitionParam {
        availableTargets: ITargetSetBuilder,
        availibleTargetsRequiredNumber: number,
        numberOfTargets: number,
        pickMode: PICK_MODE
    }


    export class SimpleTargetDefinition extends IDefTargetDefinition<TargetDefinitionParam> {

        availableTargets( source: ISource, context: HsGameCtx ): Target[] {
            return this.param.availableTargets.buildSet<Target>( source, context );
        }


        isAvailibleTargetsSetValid( availableTargets: Target[], context: HsGameCtx ): boolean {
            return availableTargets.length >= ( this.param.availibleTargetsRequiredNumber || 0 );
        }


        acquireTargetsAction( param: AcquireTargetsActionParam, context: HsGameCtx ): Action {
            if ( this.param.pickMode === PICK_MODE.RANDOM )
                return context.actionFactory.makeAChoice.singleTarget( param );
            else
                return context.actionFactory.makeAChoice.singleTarget( param );
        }


        arePickedTargetsValid( availableTargets: Target[], picked: Target[], context: HsGameCtx ): boolean {
            return ( this.param.availibleTargetsRequiredNumber === 0 && ( picked.length in [0, this.param.numberOfTargets] ) )
                || picked.length === this.param.availibleTargetsRequiredNumber;
        }
    }

}