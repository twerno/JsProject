"use strict";

namespace HsLogic {

    export class Card extends HsEntity {
        def: Def.ICard;
        name: string;
        baseCost: number;
        rarity: Def.RARITY;
        uncollectible: boolean;
        cardClass: string;

        triggers: Trigger[];
        tags: ITags;
        effects: Object[];
        enchantments: Enchantment<Permanent>[];


        constructor( public owner: Player, def?: Def.ICard ) {
            super( owner, def );
        }


        initFromDefinition( def: Def.ICard ): void {
            super.initFromDefinition( def );

            this.name = def.name;
            this.baseCost = def.cost;
            this.rarity = def.rarity;
            this.uncollectible = def.uncollectible || false;
            this.cardClass = def.cardClass || Def.CARD_CLASS.NEUTRAL;

            this.triggers = [];
            for ( let i = 0; i < def.triggers.length; i++ )
                this.triggers.push( new Trigger( this, this, def.triggers[i] ) );

            if ( def.tags )
                for ( let i = 0; i < def.tags.length; i++ )
                    this.tags.add( new def.tags[i]( {
                        action: null,
                        caster: this.owner,
                        sourceType: SOURCE_TYPE.NONE,
                        sourceCard: this
                    }) );
        }
    }

}