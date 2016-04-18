/// <reference path="../elements/ideftargetdefinition.ts" />

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

        availableTargets( source: ISource, gameCtx: HsGameCtx ): Permanent[] {
            return this.param.availableTargets.buildSet( source, gameCtx );
        }


        isAvailibleTargetsSetValid( availableTargets: Permanent[], gameCtx: HsGameCtx ): boolean {
            return availableTargets.length >= ( this.param.availibleTargetsRequiredNumber || 0 );
        }


        acquireTargetsAction( param: HsLogic.AcquireTargetsActionParam, gameCtx: HsGameCtx ): Action {
            if ( this.param.pickMode === PICK_MODE.RANDOM )
                return null;
            else
                return gameCtx.actionFactory.singleTarget( param );
        }


        arePickedTargetsValid( availableTargets: Permanent[], picked: Permanent[], gameCtx: HsGameCtx ): boolean {
            return ( this.param.availibleTargetsRequiredNumber === 0 && ( picked.length in [0, this.param.numberOfTargets] ) )
                || picked.length === this.param.availibleTargetsRequiredNumber;
        }
    }



    export function SINGLE_REQUIRED_TARGET( availableTargets: ITargetSetBuilder<Permanent>, pickMode: PICK_MODE = PICK_MODE.USER_CHOICE ): SimpleTargetDefinition {
        return new SimpleTargetDefinition( {
            availableTargets: availableTargets,
            availibleTargetsRequiredNumber: 1,
            numberOfTargets: 1,
            pickMode: pickMode
        });
    }



    export function SINGLE_OPTIONAL_TARGET( availableTargets: ITargetSetBuilder<Permanent>, pickMode: PICK_MODE = PICK_MODE.USER_CHOICE ): SimpleTargetDefinition {
        return new SimpleTargetDefinition( {
            availableTargets: availableTargets,
            availibleTargetsRequiredNumber: 0,
            numberOfTargets: 1,
            pickMode: pickMode
        });
    }
}