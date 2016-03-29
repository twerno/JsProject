"use strict";

namespace Def {

    export class MinionByHpFilter {

        constructor( public hpValue: number ) { }

        static hp( hpValue: number ): MinionByHpFilter {
            return new MinionByHpFilter( hpValue );
        }

        lessThen( source: HsSource, entity: HsLogic.HsEntity, context: GameCtx ): boolean {
            return entity instanceof HsLogic.Minion
                && entity.hp < this.hpValue;
        }

        lessThenOrEqualTo( source: HsSource, entity: HsLogic.HsEntity, context: GameCtx ): boolean {
            return entity instanceof HsLogic.Minion
                && entity.hp <= this.hpValue;
        }

        greaterThen( source: HsSource, entity: HsLogic.HsEntity, context: GameCtx ): boolean {
            return entity instanceof HsLogic.Minion
                && entity.hp > this.hpValue;
        }

        greaterThenOrEqualTo( source: HsSource, entity: HsLogic.HsEntity, context: GameCtx ): boolean {
            return entity instanceof HsLogic.Minion
                && entity.hp >= this.hpValue;
        }

        equalTo( source: HsSource, entity: HsLogic.HsEntity, context: GameCtx ): boolean {
            return entity instanceof HsLogic.Minion
                && entity.hp === this.hpValue;
        }

        notEqualTo( source: HsSource, entity: HsLogic.HsEntity, context: GameCtx ): boolean {
            return entity instanceof HsLogic.Minion
                && entity.hp !== this.hpValue;
        }
    }
}