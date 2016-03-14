///<reference path="../def/entity/ICard.ts"/>

"use strict";

namespace HSLogic {


    export class Card extends HsEntity implements ICard {
        def: ICard;
        cost: number;

        triggers: ITriggers;

        constructor( owner: Player, def?: ICard ) {
            super( owner, def );
        }


        initFromDefinition( def: ICard ): void {
            super.initFromDefinition( def );

            this.cost = def.cost;
            this.triggers = def.triggers;
        }
    }


    export class Minion extends Card implements IMinion {
        def: IMinion;

        hp: number;

        maxHp: number;

        attack: number;

        minion_type: MINION_TYPE;

        flags: IFlags;

        triggers: IPermanentsTriggers;

        initFromDefinition( def: IMinion ): void {
            super.initFromDefinition( def );

            this.hp = def.hp;
            this.maxHp = def.hp;
            this.attack = def.attack;
            this.minion_type = def.minion_type;
        }
    }

    export class Spell extends Card implements ISpell {
        def: ISpell;

        spellActions: ICardActionDefs;

        initFromDefinition( def: ISpell ): void {
            super.initFromDefinition( def );

            this.spellActions = def.spellActions;
        }
    }

    export class Weapon extends Card implements IWeapon {
        def: IWeapon;
        attack: number;
        durability: number;
        triggers: IPermanentsTriggers;

        initFromDefinition( def: IWeapon ): void {
            super.initFromDefinition( def );

            this.attack = def.attack;
            this.durability = def.durability;
        }
    }

}