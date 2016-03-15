///<reference path="../entity/HsEntity.ts"/>
///<reference path="../def/entity/IPlayer.ts"/>

"use strict";

namespace HsLogic {

    export class Player extends HsEntity implements Def.IPlayer {

        def: Def.IPlayer;

        hp: number = 30;

        maxHp: number = 30;

        manaCrystals: number;

        filled_mana_crystals: number;

        hero: any;

        heroPower: any;

        flags: Def.IFlags = {};


        constructor( public name: string, def?: Def.IPlayer ) {
            super( null, def );
        }


        protected initFromDefinition( def: Def.IPlayer ): void {
            this.hp = def.hp;
            this.maxHp = def.hp;

            this.manaCrystals = def.manaCrystals;
            this.filled_mana_crystals = def.manaCrystals;

            this.hero = def.hero;
            this.heroPower = def.heroPower;
        }
    }
}