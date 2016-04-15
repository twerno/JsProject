/// <reference path="../../elements/ideftargetdefinition.ts" />

"use strict";

namespace Def {

    export enum PICK_MODE {
        RANDOM, USER_CHOICE
    }

    export interface TargetDefinitionParam {
        availableTargets: ITargetSetBuilder<Permanent>,
        availibleTargetsRequiredNumber: number,
        numberOfTargets: number,
        pickMode: PICK_MODE
    }


    export class SimpleTargetDefinition extends IDefTargetDefinition<TargetDefinitionParam> {

        availableTargets( source: ISource, context: HsGameCtx ): Permanent[] {
            return this.param.availableTargets.buildSet( source, context );
        }


        isAvailibleTargetsSetValid( availableTargets: Permanent[], context: HsGameCtx ): boolean {
            return availableTargets.length >= ( this.param.availibleTargetsRequiredNumber || 0 );
        }


        acquireTargetsAction( param: AcquireTargetsActionParam, context: HsGameCtx ): Action {
            if ( this.param.pickMode === PICK_MODE.RANDOM )
                return context.actionFactory.makeAChoice.singleTarget( param );
            else
                return context.actionFactory.makeAChoice.singleTarget( param );
        }


        arePickedTargetsValid( availableTargets: Permanent[], picked: Permanent[], context: HsGameCtx ): boolean {
            return ( this.param.availibleTargetsRequiredNumber === 0 && ( picked.length in [0, this.param.numberOfTargets] ) )
                || picked.length === this.param.availibleTargetsRequiredNumber;
        }
    }

}