
"use strict";

namespace HsLogic {

    export class Weapon extends Card {
        def: Def.IWeapon;

        attack: number;
        durability: number;

        tags: Def.ITags;

        battlecry: Def.IDefAction;

        initFromDefinition( def: Def.IWeapon ): void {
            super.initFromDefinition( def );

            this.attack = def.attack;
            this.durability = def.durability;
            this.battlecry = def.battlecry;

            for ( let i = 0; i < def.tags.length; i++ )
                this.tags.register( new def.tags[i]( {
                    action: null,
                    caster: this.owner,
                    sourceType: SOURCE_TYPE.NONE,
                    sourceCard: this
                }) );
        }
    }

}