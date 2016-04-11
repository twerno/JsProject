"use strict";

namespace HsLogic {

    /**
    * PlayWeapon
    * http://hearthstone.gamepedia.com/Advanced_rulebook#Playing_a_weapon
    * http://hearthstone.gamepedia.com/Advanced_rulebook#Instant_weapon_destruction
    *
    * Phases:
    *   1. old weapon is destroyed and removed from play
    *   2. new weapon is equipped
    *   3. execute battlecry 
    *   4. execute deathrattle
    */

    export class EquippingPhase<P extends IEquipWeaponParam> extends Action<P> {

        resolve( self: EquippingPhase<P>, context: HsGameCtx ): PromiseOfActions {
            if ( self.param.cancelAction.value )
                return Promise.resolve( jsLogic.NO_CONSEQUENCES );

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [],
                        weaponZone: HsZone<Weapon> = context.zonesOf( param.player ).weapon,
                        oldWeapon: Weapon = weaponZone.getRawArray()[0] || null;

                    // destroy old weapon
                    if ( oldWeapon ) {
                        weaponZone.removeEntity( oldWeapon );
                        context.zonesOf( param.player ).graveyard.addEntity( oldWeapon );
                    }

                    // equip new weapon
                    weaponZone.addEntity( <Weapon>param.card );

                    // new weapon battlecry triggers
                    actions.push(
                        new ExecuteTriggers( {
                            source: param.source,
                            defActions: param.card.playActions,
                            targets: param.acquiredTargets
                        })
                    );

                    // old weapon deathrattle triggers
                    //                    if (oldWeapon)
                    //                        actions.push(
                    //                            new ExecuteTargetlessTriggers({
                    //                                source: param.source,
                    //                                defActions: oldWeapon.triggers.deathrattle
                    //                            })
                    //                            );

                    resolve( actions );
                }
            ); // return new Promise

        } // resolve( self: EquippingPhase<P>

    } // export class EquippingPhase
}