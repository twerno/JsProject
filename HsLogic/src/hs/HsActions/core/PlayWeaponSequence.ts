/// <reference path="../../core/action.ts" />

"use strict";

namespace HsLogic {

    /**
     * PlayWeaponSequence
     * http://hearthstone.gamepedia.com/Advanced_rulebook#Playing_a_weapon
     * http://hearthstone.gamepedia.com/Advanced_rulebook#Instant_weapon_destruction
     *
     * Phases:
     *   1. pay & remove from hand - 
     *   2. onPlayPhase            - OnPlayPhaseEvent
     *   3. equipping Phase        - 
     *      a. old weapon is destroyed and removed from play
     *      b. new weapon is equipped
     *      c. execute battlecry 
     *      d. execute deathrattle
     *   4. win/loss check         - outside action: PlayCard?
 	 */


    export class PlayWeaponSequence<P extends PlayWeaponParam> extends Action<P> {

        resolve( self: PlayWeaponSequence<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            if ( self.param.cancelAction.value )
                return Promise.resolve( jsAction.NO_CONSEQUENCES );

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [],
                        weaponZone: Zone<Weapon> = gameCtx.gameBoard.zonesOf( param.player ).weapon,
                        oldWeapon: Weapon = weaponZone.getRawArray()[0] || null;

                    // pay cost & remove from hand
                    actions.push( gameCtx.actionFactory.payCostAndRemoveFromHand( param ) );

                    // step 2 - onPlayPhase
                    actions.push(
                        //gameCtx.actionFactory.dispatch( new OnPlayPhaseEvent( param ) )
                    );

                    // step 3 - equipping Phase

                    // destroy old weapon
                    if ( oldWeapon ) {
                        weaponZone.removeEntity( oldWeapon );
                        gameCtx.gameBoard.zonesOf( param.player ).graveyard.addEntity( oldWeapon );
                    }

                    // equip new weapon
                    weaponZone.addEntity( <Weapon>param.card );

                    // new weapon battlecry triggers
                    // 5. Battlecry Phase
                    actions.push( new Battlecry( param ) );


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

        } // resolve( self: PlayWeaponSequence<P>

    } // export class PlayWeaponSequence
}