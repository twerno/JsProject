/// <reference path="card.ts" />

"use strict";

namespace HsLogic {

    export class Spell extends Card {
        def: Def.ISpell;

        spellAction: Def.IDefAction;

        init(): Spell {
            super.init();
            return this;
        }

        protected initFromDefinition( def: Def.ISpell ): void {
            super.initFromDefinition( def );

            this.spellAction = def.spellTextAction;
        }

        getSourceType(): SOURCE_TYPE {
            return SOURCE_TYPE.SPELL;
        }
    }

}