﻿///<reference path="../entity/Card.ts"/>
///<reference path="../entity/Player.ts"/>

"use strict";

namespace HSLogic {

    export class HsEntityFactory {

        player( name: string, def: IPlayer ): Player {
            return new Player( name, def );
        }



        card( owner: Player, def: ICard ): Card {
            if ( def.cardType === CARD_TYPE.MINION )
                return this.minion( owner, <IMinion>def );

            throw new Error( `Unknown card type: ${def.cardType}.` );
        }



        minion( owner: Player, def: IMinion ): Minion {
            return new Minion( owner, def );
        }

    }
}