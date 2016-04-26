/// <reference path="minion.ts" />

"use strict";

namespace HsLogic {

    export class Hero extends Minion {

        equipHeroActions: Def.IDefAction;

        static build( owner: Player, def: Def.IHero ): Hero {
            return new Hero( owner, def ).init();
        }

        constructor( owner: Player, def: Def.IHero ) {
            super( owner, def );
        }

        init(): Hero {
            super.init();
            return this;
        }

        protected initFromDefinition( def: Def.IHero ): void {
            super.initFromDefinition( def );

            this.body.armor = def.armor;
            this.baseCost = 0;
            this.battlecry = null;
            this.equipHeroActions = def.equipHeroActions;
        }

        getSourceType(): SOURCE_TYPE {
            return SOURCE_TYPE.PLAYER;
        }
    }

}