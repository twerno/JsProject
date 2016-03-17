///<reference path="../../core/HsAction.ts"/>
///<reference path="../../../core/action/abstractActions/CancelableAction.ts"/>

"use strict";

namespace HsLogic {

    /**
     * SummonResolutionStep
     * http://hearthstone.gamepedia.com/Advanced_rulebook#Summon_Resolution_Step
     *
     *   1. aura Update (Health/Attack) Step
     *   2. resolve: summonEvent
     *   3. aura Update (Health/Attack) Step --> Death Creation Step
     *   4. Death Creation Step              --> Death Creation Step 
     *   5. aura Update (Other) Step         --> Death Creation Step
     *   6. rerun DCS if new death happend   --> Death Creation Step
 	 */


    export class SummonResolutionStep<P extends IHsActionParam> extends HsAction<P> {

        resolvable( param: P, gameCtx: HsGameCtx ): boolean {
            return gameCtx.pendingEvents.summon.length !== 0;
        }

        resolve( _this_: SummonResolutionStep<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            if ( gameCtx.pendingEvents.summon.length === 0 )
                return Promise.resolve( jsLogic.NO_CONSEQUENCES );

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = _this_.param,
                        actions: jsLogic.IAction<HsGameCtx>[] = [],
                        event: SummonEvent,
                        card: Card;

                    // 1. aura Update (Health/Attack) Step
                    actions.push( new AuraUpdateStep( {
                        source: param.source,
                        mode: AURA_UPDATE_MODE.ATTACK_HEALTH
                    }) );

                    // 2. resolve: summonEvent
                    while ( event = gameCtx.pendingEvents.summon.shift() ) {
                        card = event.param.card;

                        // http://hearthstone.gamepedia.com/Advanced_rulebook#Summon_Resolution_Step
                        // Examples: 
                        // if the minion associated with a Summon Event is no longer in play at the time it is resolved, then nothing queues
                        if ( gameCtx.zonesOf( card.owner ).battlefield.has( card ) )
                            actions.push( this.dispatch( event, gameCtx ) );
                    }

                    // 3-6. Delegate execution to DeathCreationStep

                    resolve( actions );
                }
            ); // return new Promise

        } // resolve( _this_: PlaySpell<P>

    } // export class SummonResolutionStep
}