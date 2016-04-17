/// <reference path="minion.ts" />

"use strict";

namespace HsLogic {

    export class Hero extends Minion {

        initFromDefinition( def: Def.IMinion ): void {
            super.initFromDefinition( def );

            this.battlecry = null;
        }

        getSourceType(): SOURCE_TYPE {
            return SOURCE_TYPE.PLAYER;
        }
    }

}