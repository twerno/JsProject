
"use strict";

namespace HsLogic {

    export class Weapon extends Card {
        def: Def.IWeapon;
        attack: number;
        durability: number;

        initFromDefinition( def: Def.IWeapon ): void {
            super.initFromDefinition( def );

            this.attack = def.attack;
            this.durability = def.durability;
        }
    }

}