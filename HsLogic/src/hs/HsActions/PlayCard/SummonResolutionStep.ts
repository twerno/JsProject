///<reference path="../../core/HsAction.ts"/>


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


    export class SummonResolutionStep<P extends IActionParam> extends Action<P> {

        resolvable( context: HsGameCtx ): boolean {
            return context.pendingEvents.summon.length !== 0;
        }

        resolve( self: SummonResolutionStep<P>, context: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {

                    let param: P = self.param,
                        actions: ActionType[] = [];

                    // 1. aura Update (Health/Attack) Step
                    actions.push( new AuraUpdateStep( {
                        source: param.source,
                        auraUpdateMode: AURA_UPDATE_MODE.ATTACK_HEALTH
                    }) );


                    // 2. resolve: summonEvent
                    actions.push( new DispatchSavedEvents( event.Summon, context ) );


                    // 3-6. Delegate execution to DeathCreationStep
                    actions.push( new DeathCreationStep( param ) );

                    resolve( actions );
                }
            ); // return new Promise

        } // resolve( self: SummonResolutionStep<P>

    } // export class SummonResolutionStep
}