///<reference path="../entity/Card.ts"/>
///<reference path="../entity/Player.ts"/>

"use strict";

namespace HSLogic {

    export class HsEntityFactory {

        player( name: string, def: Def.IPlayer ): Player {
            return new Player( name, def );
        }



        card( owner: Player, def: Def.ICard ): Card {
            if ( def.cardType === Def.CARD_TYPE.MINION )
                return this.minion( owner, <Def.IMinion>def );

            throw new Error( `Unknown card type: ${def.cardType}.` );
        }



        minion( owner: Player, def: Def.IMinion ): Minion {
            return new Minion( owner, def );
        }

    }
}