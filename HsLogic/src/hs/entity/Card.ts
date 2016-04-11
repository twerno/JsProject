"use strict";

namespace HsLogic {

    export class Card extends HsEntity {
        def: Def.ICard;
        cost: number;
        name: string;
        enchantments: Object[];

        playActions: Def.IDefAction[];
        triggers: Trigger[];

        constructor( public owner: Player, def?: Def.ICard ) {
            super( owner, def );
        }


        initFromDefinition( def: Def.ICard ): void {
            super.initFromDefinition( def );

            this.name = def.name;
            //this.enchantments = def.enchantments;
            this.cost = def.cost;
            this.playActions = def.onPlayActions;

            this.triggers = [];
            let defTrigger: Def.IDefTrigger;
            //for ( let i = 0; i < def.triggers.length; i++ ) {
            //    defTrigger = def.triggers[i];
            //    if ( defTrigger )
            //        this.triggers.push(
            //            new Trigger( this, this, defTrigger ) );
            //}
        }
    }

}