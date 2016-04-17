"use strict";

namespace HsLogic {

    export class GameBoard {

        zonesMap: Collection.IStringMap<Zones> = {};


        zonesOf( player: jsAction.Entity ): Zones {
            let result: Zones = null;

            if ( player instanceof jsAction.Entity )
                result = this.zonesMap[player.id]

            if ( result )
                return result;
            else
                throw new Error( `No zones defined for player: ${player}.` );
        }


        zoneOf<T extends Card>( player: jsAction.Entity, zoneId: string ): Zone<T> {
            return <Zone<T>>this.zonesOf( player ).get( zoneId );
        }

    }
}