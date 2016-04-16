/// <reference path="hsentity.ts" />

"use strict";

namespace HsLogic {

    export class Card extends HsEntity {
        def: Def.ICard;
        name: string;
        baseCost: number;

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

            this.triggers = [];
            if ( def.triggers )
                for ( let i = 0; i < def.triggers.length; i++ )
                    this.triggers.push( new Trigger( this, this, def.triggers[i] ) );

            if ( def.tags )
                for ( let i = 0; i < def.tags.length; i++ )
                    this.tags.add( new def.tags[i]( {
                        //action: null,
                        player: this.owner,
                        sourceType: SOURCE_TYPE.NONE,
                        entity: this
                    }) );
        }
    }

}