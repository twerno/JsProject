
"use strict";

namespace HsLogic {

    export class Spell extends Card {
        def: Def.ISpell;

        spellActions: Def.IDefAction[];

        initFromDefinition( def: Def.ISpell ): void {
            super.initFromDefinition( def );
        }
    }

}