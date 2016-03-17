///<reference path="../def/entity/ICard.ts"/>

"use strict";

namespace HsLogic {

    export class Card extends HsEntity implements Def.ICardImpl {
        def: Def.ICard;
        cost: number;
        name: string;
        enchantments: Def.IEnchantment[];

        playActions: Def.IDefAction[];
        triggers: Trigger[];

        constructor( public owner: Player, def?: Def.ICard ) {
            super( owner, def );
            this.type = Def.TYPE.UNKNOWN;
        }


        initFromDefinition( def: Def.ICard ): void {
            super.initFromDefinition( def );

            this.name = def.name;
            this.enchantments = def.enchantments;
            this.cost = def.cost;
            this.playActions = def.playActions;

            this.triggers = [];
            let defTrigger: Def.IDefTrigger;
            for ( let i = 0; i < def.triggers.length; i++ ) {
                defTrigger = def.triggers[i];
                if ( defTrigger )
                    this.triggers.push(
                        new Trigger( this, this, defTrigger ) );
            }
        }
    }


    export class Minion extends Card implements Def.IMinionImpl {
        def: Def.IMinion;

        hp: number;

        maxHp: number;

        attack: number;

        minion_type: Def.MINION_TYPE;

        flags: Def.IFlags;


        initFromDefinition( def: Def.IMinion ): void {
            super.initFromDefinition( def );

            this.type = Def.TYPE.MINION;
            this.hp = def.hp;
            this.maxHp = def.hp;
            this.attack = def.attack;
            this.minion_type = def.minion_type;
        }
    }

    export class Spell extends Card implements Def.ISpellImpl {
        def: Def.ISpell;

        spellActions: Def.IDefAction[];

        initFromDefinition( def: Def.ISpell ): void {
            super.initFromDefinition( def );

            this.type = Def.TYPE.SPELL;
        }
    }

    export class Weapon extends Card implements Def.IWeaponImpl {
        def: Def.IWeapon;
        attack: number;
        durability: number;

        initFromDefinition( def: Def.IWeapon ): void {
            super.initFromDefinition( def );

            this.type = Def.TYPE.WEAPON;
            this.attack = def.attack;
            this.durability = def.durability;
        }
    }

}