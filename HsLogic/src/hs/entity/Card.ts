///<reference path="../def/entity/ICard.ts"/>

"use strict";

namespace HSLogic {


    export class Card extends HsEntity implements Def.ICard {
        def: Def.ICard;
        cost: number;

        triggers: Def.ITriggers;

        constructor( owner: Player, def?: Def.ICard ) {
            super( owner, def );
        }


        initFromDefinition( def: Def.ICard ): void {
            super.initFromDefinition( def );

            this.cost = def.cost;
            this.triggers = def.triggers;
        }
    }


    export class Minion extends Card implements Def.IMinion {
        def: Def.IMinion;

        hp: number;

        maxHp: number;

        attack: number;

        minion_type: Def.MINION_TYPE;

        flags: Def.IFlags;

        triggers: Def.IPermanentTriggers;

        initFromDefinition( def: Def.IMinion ): void {
            super.initFromDefinition( def );

            this.hp = def.hp;
            this.maxHp = def.hp;
            this.attack = def.attack;
            this.minion_type = def.minion_type;
        }
    }

    export class Spell extends Card implements Def.ISpell {
        def: Def.ISpell;

        spellActions: Def.IDefAction[];

        initFromDefinition( def: Def.ISpell ): void {
            super.initFromDefinition( def );

            this.spellActions = def.spellActions;
        }
    }

    export class Weapon extends Card implements Def.IWeapon {
        def: Def.IWeapon;
        attack: number;
        durability: number;
        triggers: Def.IPermanentTriggers;

        initFromDefinition( def: Def.IWeapon ): void {
            super.initFromDefinition( def );

            this.attack = def.attack;
            this.durability = def.durability;
        }
    }

}