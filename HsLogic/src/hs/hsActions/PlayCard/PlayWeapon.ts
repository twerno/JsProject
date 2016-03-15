///<reference path="../../core/HsAction.ts"/>
///<reference path="../../../core/action/abstractActions/CancelableAction.ts"/>

"use strict";

namespace HsLogic {

    /**
     * PlayWeapon
     * http://hearthstone.gamepedia.com/Advanced_rulebook#Playing_a_weapon
     *
     * Phases:
     *   1. pay & remove from hand - outside action: PlayCard
     *   2. onPlayPhase            - OnPlayPhaseEvent
     *   3. equipping Phase        - 
     *   4. win/loss check         - outside action: PlayCard?
 	 */

    export class PlayWeapon<P extends IEquipWeaponParam> extends HsAction<P> {

        resolve( _this_: PlayWeapon<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            if ( _this_.param.cancelAction.value )
                return Promise.resolve( jsLogic.NO_CONSEQUENCES );

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = _this_.param,
                        actions: jsLogic.IAction<HsGameCtx>[] = []

                    // step 2 - onPlayPhase
                    actions.push(
                        gameCtx.actionFactory.dispatch( new OnPlayPhaseEvent( param ) )
                    );

                    // step 3 - equipping Phase
                    actions.push(
                        new EquippingPhase( param )
                    );

                    resolve( actions );
                }
            ); // return new Promise

        } // resolve( _this_: PlayWeapon<P>

    } // export class PlayWeapon
}