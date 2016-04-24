/// <reference path="card.ts" />

"use strict";

namespace HsLogic {


    export class Minion extends Card implements ILivingEntity {
        def: Def.IMinion;
        body: MinionBody = new MinionBody();
        minion_type: string;

        battlecry: Def.IDefAction;

        init(): Minion {
            super.init();
            return this;
        }

        protected initFromDefinition( def: Def.IMinion ): void {
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


    export class MinionBody {
        hp(): number { return this.health - this.damages };
        health: number = 0;
        attack: number = 0;
        damages: number = 0;
    }

}