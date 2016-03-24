///<reference path="../def/entity/ICard.ts"/>

"use strict";

namespace HsLogic {

    export class Weapon extends Card implements Def.IWeaponImpl {
        def: Def.IWeapon;
        attack: number;
        durability: number;

        initFromDefinition( def: Def.IWeapon ): void {
            super.initFromDefinition( def );

            this.type = Def.TYPE.WEAPON;
            this.attack = def.attack;
            this.durability = def.durability;
        }
    }

}