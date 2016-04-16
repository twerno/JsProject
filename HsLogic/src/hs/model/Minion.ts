/// <reference path="card.ts" />

"use strict";

namespace HsLogic {

    export class Minion extends Card implements ILivingEntity {
        def: Def.IMinion;
        body: MinionBody = new MinionBody();
        minion_type: string;

        battlecry: Def.IDefAction;

        initFromDefinition( def: Def.IMinion ): void {
            super.initFromDefinition( def );

            this.body.attack = def.attack;
            this.body.health = def.health;

            this.minion_type = def.minion_type;
            this.battlecry = def.battlecry || null;
        }

        getSourceType(): SOURCE_TYPE {
            return SOURCE_TYPE.MINION;
        }
    }

}