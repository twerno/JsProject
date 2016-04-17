/// <reference path="../core/actionevent.ts" />
"use strict";

namespace HsLogic.event {


    export class Damage<P extends DamageParam> extends ActionEvent<P> {

        valid( gameCtx: HsGameCtx ): boolean {
            return this.param.damageState === DAMAGE_STATE.DEALT
                && this.param.amount > 0;
        }

    }


    export class PreDamagePhase<P extends DamageParam> extends ActionEvent<P> { }


    export class PreDamageCalculationEvent<P extends CalculateDamageParam> extends ActionEvent<P> { }


    export class PostDamageCalculationEvent<P extends CalculateDamageParam> extends ActionEvent<P> { }

}