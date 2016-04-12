"use strict";

namespace HsLogic {

    export class Card extends HsEntity {
        def: Def.ICard;
        name: string;
        baseCost: number;
        rarity: Def.RARITY;
        uncollectible: boolean;

        triggers: Trigger[];
        //        enchantments: Object[];


        constructor( public owner: Player, def?: Def.ICard ) {
            super( owner, def );
        }


        initFromDefinition( def: Def.ICard ): void {
            super.initFromDefinition( def );

            this.name = def.name;
            this.baseCost = def.cost;
            this.rarity = def.rarity;
            this.uncollectible = def.uncollectible || false;

            this.triggers = [];
            for ( let i = 0; i < def.triggers.length; i++ )
                this.triggers.push( new Trigger( this, this, def.triggers[i] ) );

            //this.enchantments = def.enchantments;
        }
    }

}