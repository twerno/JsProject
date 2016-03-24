///<reference path="../def/entity/ICard.ts"/>

"use strict";

namespace HsLogic {

    export class Spell extends Card implements Def.ISpellImpl {
        def: Def.ISpell;

        spellActions: Def.IDefAction[];

        initFromDefinition( def: Def.ISpell ): void {
            super.initFromDefinition( def );

            this.type = Def.TYPE.SPELL;
        }
    }

}