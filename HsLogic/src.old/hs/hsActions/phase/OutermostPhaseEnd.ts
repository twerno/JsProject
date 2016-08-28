/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {

    //Exceptions:
    //
    //Note that the Targeting Phase of the 'playing a spell' Sequence and the After Play Phase of the 'playing a minion' Sequence lack both a Death Creation Step and a Summon Resolution Step after they resolve. This is likely to be a bug.



    /**
     * OutermostPhaseEnd
     * http://hearthstone.gamepedia.com/Advanced_rulebook#Summon_Resolution_Step
     *
     *   0. Remove all auras & enchantments
     *   1. reapply all (Health/Attack) auras & enchantments 
     *   2. resolve: summonEvent
     *
     *   DEATH PHASE:
     *   3.1. Remove all auras & enchantments
     *   3.2. reapply all (Health/Attack) auras & enchantments
     *   4. Death Creation Step              --> Death Creation Step 
     *   5. reapply auras: (Other)           
     *   6. DispatchSavedEvents(event.Death)
     *   6. check for pending_destroy or lethal damage and rerun DeathPhase
 	 */
    export class OutermostPhaseEnd<P extends IActionParam> extends Action<P> {

        resolve( self: OutermostPhaseEnd<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [];


                    //1. aura Update (Health / Attack) Step
                    actions.push( new AuraUpdateStep( {
                        source: param.source,
                        auraType: Def.AURA_TYPE.ATTACK_HEALTH
                    }) );


                    // 2. SummonResolutionStep 
                    actions.push( new DispatchSavedEvents( event.Summon, gameCtx ) );


                    // 3. aura Update (Health/Attack) Step
                    actions.push( new AuraUpdateStep( {
                        source: param.source,
                        auraType: Def.AURA_TYPE.ATTACK_HEALTH
                    }) );


                    // 4. process Death
                    actions.push( new DeathPhase( { source: param.source }) );


                    resolve( actions );
                });
        }
    }
}