"use strict";

namespace Def {

    export class MinionByHpFilter {

        constructor( public hpValue: number ) { }

        static hp( hpValue: number ): MinionByHpFilter {
            return new MinionByHpFilter( hpValue );
        }

        lessThen( source: ISource, entity: HsLogic.HsEntity, context: HsGameCtx ): boolean {
            return entity instanceof HsLogic.Minion
                && entity.hp < this.hpValue;
        }

        lessThenOrEqualTo( source: ISource, entity: HsLogic.HsEntity, context: HsGameCtx ): boolean {
            return entity instanceof HsLogic.Minion
                && entity.hp <= this.hpValue;
        }

        greaterThen( source: ISource, entity: HsLogic.HsEntity, context: HsGameCtx ): boolean {
            return entity instanceof HsLogic.Minion
                && entity.hp > this.hpValue;
        }

        greaterThenOrEqualTo( source: ISource, entity: HsLogic.HsEntity, context: HsGameCtx ): boolean {
            return entity instanceof HsLogic.Minion
                && entity.hp >= this.hpValue;
        }

        equalTo( source: ISource, entity: HsLogic.HsEntity, context: HsGameCtx ): boolean {
            return entity instanceof HsLogic.Minion
                && entity.hp === this.hpValue;
        }

        notEqualTo( source: ISource, entity: HsLogic.HsEntity, context: HsGameCtx ): boolean {
            return entity instanceof HsLogic.Minion
                && entity.hp !== this.hpValue;
        }
    }
}