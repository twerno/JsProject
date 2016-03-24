///<reference path="../../core/HsAction.ts"/>


"use strict";

namespace HsLogic {

    /**
     * PlayWeapon
     * http://hearthstone.gamepedia.com/Advanced_rulebook#Playing_a_weapon
     *
     * Phases:
     *   1. pay & remove from hand - 
     *   2. onPlayPhase            - OnPlayPhaseEvent
     *   3. equipping Phase        - 
     *   4. win/loss check         - outside action: PlayCard?
 	 */

    export class PlayWeapon<P extends IEquipWeaponParam> extends Action<P> {

        resolve( self: PlayWeapon<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            if ( self.param.cancelAction.value )
                return Promise.resolve( jsLogic.NO_CONSEQUENCES );

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: jsLogic.IAction<HsGameCtx>[] = []

                    // pay cost & remove from hand
                    actions.push( gameCtx.actionFactory.payCostAndRemoveFromHand( param ) );

                    // step 2 - onPlayPhase
                    actions.push(
                        //gameCtx.actionFactory.dispatch( new OnPlayPhaseEvent( param ) )
                    );

                    // step 3 - equipping Phase
                    actions.push(
                        new EquippingPhase( param )
                    );

                    resolve( actions );
                }
            ); // return new Promise

        } // resolve( self: PlayWeapon<P>

    } // export class PlayWeapon
}