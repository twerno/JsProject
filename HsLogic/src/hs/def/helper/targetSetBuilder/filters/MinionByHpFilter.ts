"use strict";

namespace Def {
    //TODO - przerobic tak jak otherThan
    export class MinionByAttackFilter {

        constructor( public attackValue: number ) { }

        static ATTACK( attackValue: number ): MinionByAttackFilter {
            return new MinionByAttackFilter( attackValue );
        }

        lessThen( source: ISource, entity: HsLogic.HsEntity, context: HsGameCtx ): boolean {
            return entity instanceof HsLogic.Minion
                && entity.body.attack < this.attackValue;
        }

        lessThenOrEqualTo( source: ISource, entity: HsLogic.HsEntity, context: HsGameCtx ): boolean {
            return entity instanceof HsLogic.Minion
                && entity.body.attack <= this.attackValue;
        }

        greaterThen( source: ISource, entity: HsLogic.HsEntity, context: HsGameCtx ): boolean {
            return entity instanceof HsLogic.Minion
                && entity.body.attack > this.attackValue;
        }

        greaterThenOrEqualTo( source: ISource, entity: HsLogic.HsEntity, context: HsGameCtx ): boolean {
            return entity instanceof HsLogic.Minion
                && entity.body.attack >= this.attackValue;
        }

        equalTo( source: ISource, entity: HsLogic.HsEntity, context: HsGameCtx ): boolean {
            return entity instanceof HsLogic.Minion
                && entity.body.attack === this.attackValue;
        }

        notEqualTo( source: ISource, entity: HsLogic.HsEntity, context: HsGameCtx ): boolean {
            return entity instanceof HsLogic.Minion
                && entity.body.attack !== this.attackValue;
        }
    }
}