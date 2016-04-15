"use strict";

namespace Def {
    //TODO - przerobic tak jak otherThan
    export class MinionByHpFilter {

        constructor( public hpValue: number ) { }

        static hp( hpValue: number ): MinionByHpFilter {
            return new MinionByHpFilter( hpValue );
        }

        lessThen( source: ISource, entity: HsLogic.HsEntity, context: HsGameCtx ): boolean {
            return entity instanceof HsLogic.Minion
                && entity.body.hp() < this.hpValue;
        }

        lessThenOrEqualTo( source: ISource, entity: HsLogic.HsEntity, context: HsGameCtx ): boolean {
            return entity instanceof HsLogic.Minion
                && entity.body.hp() <= this.hpValue;
        }

        greaterThen( source: ISource, entity: HsLogic.HsEntity, context: HsGameCtx ): boolean {
            return entity instanceof HsLogic.Minion
                && entity.body.hp() > this.hpValue;
        }

        greaterThenOrEqualTo( source: ISource, entity: HsLogic.HsEntity, context: HsGameCtx ): boolean {
            return entity instanceof HsLogic.Minion
                && entity.body.hp() >= this.hpValue;
        }

        equalTo( source: ISource, entity: HsLogic.HsEntity, context: HsGameCtx ): boolean {
            return entity instanceof HsLogic.Minion
                && entity.body.hp() === this.hpValue;
        }

        notEqualTo( source: ISource, entity: HsLogic.HsEntity, context: HsGameCtx ): boolean {
            return entity instanceof HsLogic.Minion
                && entity.body.hp() !== this.hpValue;
        }
    }
}