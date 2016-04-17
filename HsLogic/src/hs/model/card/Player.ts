/// <reference path="genentity.ts" />

"use strict";

namespace HsLogic {

    export class Player extends Entity implements ILivingEntity {

        def: Def.IMinion; //TODO
        body: MinionBody = new MinionBody();


        manaCrystals: number;

        filled_mana_crystals: number;

        hero: any;

        heroPower: any;

        triggers: Trigger[];

        tags: ITags;

        constructor( public name: string ) {
            super( null, null );
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