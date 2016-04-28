/// <reference path="genentity.ts" />

"use strict";

namespace HsLogic {

    export class Player extends Entity {

        manaCrystals: number;
        filled_mana_crystals: number;

        hero: Hero;

        heroPower: HeroPower;

        triggers: Trigger[] = [];
        tags: Tags = new Tags();

        constructor( public name: string ) {
            super( null, null );
        }

        init(): Player {
            super.init();
            return this;
        }

        getSourceType(): SOURCE_TYPE {
            return SOURCE_TYPE.PLAYER;
        }
    }
}