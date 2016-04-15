/// <reference path="card.ts" />

"use strict";

namespace HsLogic {

    export class Spell extends Card {
        def: Def.ISpell;

        spellAction: Def.IDefAction;

        initFromDefinition( def: Def.ISpell ): void {
            super.initFromDefinition( def );

            this.spellAction = def.spellTextAction;
        }
    }

}