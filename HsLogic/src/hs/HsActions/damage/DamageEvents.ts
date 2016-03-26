"use strict";

namespace HsLogic.event {


    export class Damage<P extends DamageParam> extends ActionEvent<P> {

        valid( context: HsGameCtx ): boolean {
            return this.param.damageState === DAMAGE_STATE.DEALT
                && this.param.amount > 0;
        }

    }


    export class PreDamagePhase<P extends DamageParam> extends ActionEvent<P> { }


    export class PreDamageCalculationEvent<P extends DamageTargetsParam> extends ActionEvent<P> { }


    export class PostDamageCalculationEvent<P extends DamageTargetsParam> extends ActionEvent<P> { }

}