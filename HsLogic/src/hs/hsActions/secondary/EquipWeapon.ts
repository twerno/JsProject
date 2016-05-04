/// <reference path="../../core/action.ts" />

"use strict";

namespace HsLogic {

    export interface IEquipWeaponParam extends IActionParam {
        targetPlayer: Player,
        weapon: Weapon
    }

    /**
     * EquipWeapon
     * http://hearthstone.gamepedia.com/Advanced_rulebook#Playing_a_weapon
     * http://hearthstone.gamepedia.com/Advanced_rulebook#Instant_weapon_destruction
     *
     * Phases:
     *   1. old weapon is destroyed and removed from play
     *   2. new weapon is equipped
     *   3. execute deathrattle
 	 */


    export class EquipWeapon<P extends IEquipWeaponParam> extends Action<P> {

        resolve( self: EquipWeapon<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [],
                        weaponZone: Zone<Weapon> = gameCtx.gameBoard.zonesOf( param.targetPlayer ).weapon,
                        oldWeapon: Weapon = weaponZone.getRawArray()[0] || null;

                    // destroy old weapon
                    if ( oldWeapon ) {
                        weaponZone.removeEntity( oldWeapon );
                        gameCtx.gameBoard.zonesOf( param.targetPlayer ).graveyard.addEntity( oldWeapon );
                    }


                    // equip new weapon
                    weaponZone.addEntity( param.weapon );


                    // old weapon deathrattle triggers
                    if ( oldWeapon )
                        actions.push(
                            new event.Death( {
                                source: param.source, target: oldWeapon, position: 0
                            }).dispatch( gameCtx )
                        );


                    resolve( actions );
                }
            ); // return new Promise

        } // resolve( self: EquipWeapon<P>

    } // export class EquipWeapon
}