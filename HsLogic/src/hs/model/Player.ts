"use strict";

namespace HsLogic {

    export class Player extends HsEntity implements ILivingEntity {

        def: Def.Minion; //TODO

        hp(): number { return this.hp() - this.damages };
        attack: number;
        health: number = 30;
        damages: number = 0;

        manaCrystals: number;

        filled_mana_crystals: number;

        hero: any;

        heroPower: any;

        //        flags: Def.IFlags = {};

        triggers: Trigger[];

        tags: ITags;
        effects: Object[];


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
    }
}