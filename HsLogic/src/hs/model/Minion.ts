
"use strict";

namespace HsLogic {

    export class Minion extends Card implements ILivingEntity {
        def: Def.IMinion;

        hp(): number { return this.hp() - this.damages };
        attack: number;
        health: number;
        damages: number = 0;
        minion_type: string;

        battlecry: Def.IDefAction;

        //states: PermanentState<any>[] = [];

        initFromDefinition( def: Def.IMinion ): void {
            super.initFromDefinition( def );

            //this.states = [];

            this.attack = def.attack;
            this.health = def.health;

            this.minion_type = def.minion_type;
            this.battlecry = def.battlecry || null;
        }
    }

}