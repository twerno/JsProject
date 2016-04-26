/// <reference path="minion.ts" />

"use strict";

namespace HsLogic {

    export class HeroPower extends Entity {

        name: string;
        cost: number;
        ability: Def.IDefAction;

        static build( owner: Player, def: Def.IHeroPower ): HeroPower {
            return new HeroPower( owner, def ).init();
        }

        constructor( owner: Player, def: Def.IHeroPower ) {
            super( owner, def );
        }

        init(): HeroPower {
            super.init();
            return this;
        }

        protected initFromDefinition( def: Def.IHeroPower ): void {
            super.initFromDefinition( def );

            this.name = def.name;
            this.cost = def.cost;
            this.ability = def.ability;
        }

        getSourceType(): SOURCE_TYPE {
            return SOURCE_TYPE.HERO_POWER;
        }
    }

}