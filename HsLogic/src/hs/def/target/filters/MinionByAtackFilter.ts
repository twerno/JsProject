"use strict";

namespace Def {

    export class MinionByAttackFilter {

        constructor( public attackValue: number ) { }

        static ATTACK( attackValue: number ): MinionByAttackFilter {
            return new MinionByAttackFilter( attackValue );
        }

        lessThen( source: HSLogic.IHsSource, entity: HSLogic.HsEntity, gameCtx: HSLogic.HsGameCtx ): boolean {
            return entity instanceof HSLogic.Minion
                && entity.attack < this.attackValue;
        }

        lessThenOrEqualTo( source: HSLogic.IHsSource, entity: HSLogic.HsEntity, gameCtx: HSLogic.HsGameCtx ): boolean {
            return entity instanceof HSLogic.Minion
                && entity.attack <= this.attackValue;
        }

        greaterThen( source: HSLogic.IHsSource, entity: HSLogic.HsEntity, gameCtx: HSLogic.HsGameCtx ): boolean {
            return entity instanceof HSLogic.Minion
                && entity.attack > this.attackValue;
        }

        greaterThenOrEqualTo( source: HSLogic.IHsSource, entity: HSLogic.HsEntity, gameCtx: HSLogic.HsGameCtx ): boolean {
            return entity instanceof HSLogic.Minion
                && entity.attack >= this.attackValue;
        }

        equalTo( source: HSLogic.IHsSource, entity: HSLogic.HsEntity, gameCtx: HSLogic.HsGameCtx ): boolean {
            return entity instanceof HSLogic.Minion
                && entity.attack === this.attackValue;
        }

        notEqualTo( source: HSLogic.IHsSource, entity: HSLogic.HsEntity, gameCtx: HSLogic.HsGameCtx ): boolean {
            return entity instanceof HSLogic.Minion
                && entity.attack !== this.attackValue;
        }
    }
}