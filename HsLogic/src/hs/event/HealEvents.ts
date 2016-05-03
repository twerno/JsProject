/// <reference path="../core/actionevent.ts" />

"use strict";

namespace HsLogic.event {


    export class PreCalculateAndHealEvent<P extends HealTargetsParam> extends ActionEvent<P> { }
    export class PreSplitHealEvent<P extends SplitHealParam> extends ActionEvent<P> { }


    export class PreHealPhase<P extends HealParam> extends ActionEvent<P> { }



    export class Heal<P extends HealParam> extends ActionEvent<P> {

        valid( gameCtx: HsGameCtx ): boolean {
            return this.param.healState === HEAL_STATE.HEALED
                && this.param.amount > 0;
        }

    }



    export class PreHealCalculationEvent<P extends CalculateHealParam> extends CancelableEvent<P> { }



    export class PostHealCalculationEvent<P extends CalculateHealParam> extends CancelableEvent<P> { }
}