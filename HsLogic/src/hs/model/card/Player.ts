/// <reference path="genentity.ts" />

"use strict";

namespace HsLogic {

    export class Player extends Entity {

        manaCrystals: number;
        filled_mana_crystals: number;

        hero: Hero;

        heroPower: HeroPower;

        tags: Tags = new Tags();

        constructor( public name: string ) {
            super( null, null );
        }

        init(): Player {
            super.init();
            return this;
        }


        //        protected initFromDefinition(def: Def.IPlayer): void {
        //            this.hp = def.hp;
        //            this.maxHp = def.hp;
        //
        //            this.manaCrystals = def.manaCrystals;
        //            this.filled_mana_crystals = def.manaCrystals;
        //
        //            this.hero = def.hero;
        //            this.heroPower = def.heroPower;
        //        }

        getSourceType(): SOURCE_TYPE {
            return SOURCE_TYPE.PLAYER;
        }
    }
}