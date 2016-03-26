"use strict";

namespace HsLogic.event {


    export class PreHealPhase<P extends HealParam> extends ActionEvent<P> { }



    export class Heal<P extends HealParam> extends ActionEvent<P> {

        valid( context: HsGameCtx ): boolean {
            return this.param.healState === HEAL_STATE.HEALED
                && this.param.amount > 0;
        }

    }



    export class PreHealCalculationEvent<P extends HealTargetsParam> extends ActionEvent<P> { }



    export class PostHealCalculationEvent<P extends HealTargetsParam> extends ActionEvent<P> { }
}