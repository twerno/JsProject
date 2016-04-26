/// <reference path="card.ts" />

"use strict";

namespace HsLogic {

    export class Weapon extends Card {
        def: Def.IWeapon;

        attack: number;
        durability: number;

        battlecry: Def.IDefAction;


        static build( owner: Player, def: Def.IWeapon ): Weapon {
            return new Weapon( owner, def ).init();
        }


        init(): Weapon {
            super.init();
            return this;
        }

        protected initFromDefinition( def: Def.IWeapon ): void {
            super.initFromDefinition( def );

            this.attack = def.attack;
            this.durability = def.durability;
            this.battlecry = def.battlecry || null;
        }

        getSourceType(): SOURCE_TYPE {
            return SOURCE_TYPE.PLAYER;
        }
    }

}