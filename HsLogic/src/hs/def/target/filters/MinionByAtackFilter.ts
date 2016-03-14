"use strict";

namespace Def {

    export class MinionByAttackFilter {

        constructor( public attackValue: number ) { }

        static ATTACK( attackValue: number ): MinionByAttackFilter {
            return new MinionByAttackFilter( attackValue );
        }

        lessThen( source: HsSource, entity: HSLogic.HsEntity, gameCtx: GameCtx ): boolean {
            return entity instanceof HSLogic.Minion
                && entity.attack < this.attackValue;
        }

        lessThenOrEqualTo( source: HsSource, entity: HSLogic.HsEntity, gameCtx: GameCtx ): boolean {
            return entity instanceof HSLogic.Minion
                && entity.attack <= this.attackValue;
        }

        greaterThen( source: HsSource, entity: HSLogic.HsEntity, gameCtx: GameCtx ): boolean {
            return entity instanceof HSLogic.Minion
                && entity.attack > this.attackValue;
        }

        greaterThenOrEqualTo( source: HsSource, entity: HSLogic.HsEntity, gameCtx: GameCtx ): boolean {
            return entity instanceof HSLogic.Minion
                && entity.attack >= this.attackValue;
        }

        equalTo( source: HsSource, entity: HSLogic.HsEntity, gameCtx: GameCtx ): boolean {
            return entity instanceof HSLogic.Minion
                && entity.attack === this.attackValue;
        }

        notEqualTo( source: HsSource, entity: HSLogic.HsEntity, gameCtx: GameCtx ): boolean {
            return entity instanceof HSLogic.Minion
                && entity.attack !== this.attackValue;
        }
    }
}