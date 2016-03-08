///<reference path="../core/HsEntity.ts"/>
///<reference path="def/IPlayer.ts"/>

"use strict";

namespace HSLogic {

    export class Player extends HsEntity implements IPlayer {

        hp: number = 30;

        maxHp: number = 30;

        manaCrystals: number;

        filled_mana_crystals: number;

        hero: any;

        heroPower: any;


        constructor(public name: string, def?: IPlayer) {
            super(null, def);
        }


        protected initFromDefinition(def: IPlayer): void {
            this.hp = def.hp;
            this.maxHp = def.hp;

            this.manaCrystals = def.manaCrystals;
            this.filled_mana_crystals = def.manaCrystals;

            this.hero = def.hero;
            this.heroPower = def.heroPower;
        }
    }
}