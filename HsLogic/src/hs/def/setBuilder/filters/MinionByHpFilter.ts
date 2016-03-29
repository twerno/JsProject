"use strict";

namespace Def {

    export class MinionByAttackFilter {

        constructor( public attackValue: number ) { }

        static ATTACK( attackValue: number ): MinionByAttackFilter {
            return new MinionByAttackFilter( attackValue );
        }

        lessThen( source: HsSource, entity: HsLogic.HsEntity, context: GameCtx ): boolean {
            return entity instanceof HsLogic.Minion
                && entity.attack < this.attackValue;
        }

        lessThenOrEqualTo( source: HsSource, entity: HsLogic.HsEntity, context: GameCtx ): boolean {
            return entity instanceof HsLogic.Minion
                && entity.attack <= this.attackValue;
        }

        greaterThen( source: HsSource, entity: HsLogic.HsEntity, context: GameCtx ): boolean {
            return entity instanceof HsLogic.Minion
                && entity.attack > this.attackValue;
        }

        greaterThenOrEqualTo( source: HsSource, entity: HsLogic.HsEntity, context: GameCtx ): boolean {
            return entity instanceof HsLogic.Minion
                && entity.attack >= this.attackValue;
        }

        equalTo( source: HsSource, entity: HsLogic.HsEntity, context: GameCtx ): boolean {
            return entity instanceof HsLogic.Minion
                && entity.attack === this.attackValue;
        }

        notEqualTo( source: HsSource, entity: HsLogic.HsEntity, context: GameCtx ): boolean {
            return entity instanceof HsLogic.Minion
                && entity.attack !== this.attackValue;
        }
    }
}