/// <reference path="genentity.ts" />

"use strict";

namespace HsLogic {

    export class Card extends Entity {
        def: Def.ICard;
        name: string;
        baseCost: number;

        triggers: Trigger[] = [];
        tags: Tags = new Tags();

        enchantments: Enchantment<Permanent>[] = [];


        constructor( owner: Player, def?: Def.ICard ) {
            super( owner, def );
        }

        init(): Card {
            super.init();
            return this;
        }

        protected initFromDefinition( def: Def.ICard ): void {
            super.initFromDefinition( def );

            this.name = def.name;
            this.baseCost = def.cost;

            this.triggers = [];
            if ( def.triggers )
                for ( let i = 0; i < def.triggers.length; i++ )
                    this.triggers.push( new Trigger( this, this, def.triggers[i] ) );

            if ( def.tags )
                for ( let i = 0; i < def.tags.length; i++ )
                    this.tags.add( new def.tags[i]( {
                        player: this.owner,
                        sourceType: SOURCE_TYPE.NONE,
                        entity: this
                    }) );
        }
    }

}