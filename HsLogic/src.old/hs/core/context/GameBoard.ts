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
                throw new Error( `No zones owned by: ${player}.` );
        }

        isInPlay( entity: Minion | Hero | Weapon | Secret ): boolean {
            let zones: Zones = this.zonesOf( entity.owner );

            if ( entity instanceof Hero )
                return zones.hero.contains( entity )
            else if ( entity instanceof Minion )
                return zones.battlefield.contains( entity )
            else if ( entity instanceof Weapon )
                return zones.weapon.contains( entity )
            else if ( entity instanceof Secret )
                return zones.secret.contains( entity );

            throw new Error( '${entity}' );
        }

    }
}