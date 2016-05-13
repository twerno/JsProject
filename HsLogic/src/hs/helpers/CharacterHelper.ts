"use strict";

namespace HsLogic {

    export function calculatePower( character: Character, gameCtx: HsGameCtx ): number {
        if ( character instanceof Hero )
            return character.body.attack
                + ( gameCtx.activePlayer === character.owner ? getWeaponPowerOfActivePlayer( gameCtx ) : 0 );
        else
            return character.body.attack;
    }

    export function getWeaponPowerOfActivePlayer( gameCtx: HsGameCtx ): number {
        let weaponZone: Zone<Weapon> = gameCtx.gameBoard.zonesOf( gameCtx.activePlayer ).weapon;
        if ( weaponZone.isEmpty )
            return 0;
        else
            return weaponZone.entities[0].attack;
    }
}