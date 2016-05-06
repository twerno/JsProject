"use strict";

namespace HsLogic {

    export class GameBoard {

        zonesMap: Collection.IStringMap<Zones> = {};

        auras: Aura[] = [];


        zonesOf( player: jsAction.Entity ): Zones {
            let result: Zones = null;

            if ( player instanceof jsAction.Entity )
                result = this.zonesMap[player.id]

            if ( result )
                return result;
            else
                throw new Error( `No zones defined for player: ${player}.` );
        }

    }
}