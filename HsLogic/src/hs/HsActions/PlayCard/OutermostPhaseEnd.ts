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

        resolve( self: OutermostPhaseEnd<P>, context: HsGameCtx ): PromiseOfActions {
            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [];


                    //1. aura Update (Health / Attack) Step
                    actions.push( new AuraUpdateStep( {
                        source: param.source,
                        auraUpdateMode: AURA_UPDATE_MODE.ATTACK_HEALTH
                    }) );


                    // 2. SummonResolutionStep 
                    actions.push( new DispatchSavedEvents( event.Summon, context ) );


                    // 3. aura Update (Health/Attack) Step
                    actions.push( new AuraUpdateStep( {
                        source: param.source,
                        auraUpdateMode: AURA_UPDATE_MODE.ATTACK_HEALTH
                    }) );


                    // 4. process Death
                    actions.push( new DeathPhase( { source: param.source }) );


                    resolve( actions );
                });
        }
    }


    /**
     * DeathPhase
     * http://hearthstone.gamepedia.com/Advanced_rulebook#Death_Phases_and_consequences_of_Death
     * http://hearthstone.gamepedia.com/Advanced_rulebook#Summon_Resolution_Step
     * http://hearthstone.gamepedia.com/Advanced_rulebook#Where_do_Minions_summoned_by_Deathrattles_spawn.3F
     * http://hearthstone.gamepedia.com/Advanced_rulebook#Destroy_effects_in_all_zones
     * http://hearthstone.gamepedia.com/Advanced_rulebook#.27Pending_destroy.27_bugs_and_effects
     * http://hearthstone.gamepedia.com/Advanced_rulebook#Forced_Death_Phase
     *
     *   3.1. Remove all auras & enchantments
     *   3.2. reapply all (Health/Attack) auras & enchantments
     *   4. Death Creation Step              --> Death Creation Step 
     *   5. reapply auras: (Other)           
     *   6. DispatchSavedEvents(event.Death)
     *   6. check for pending_destroy or lethal damage and rerun DeathPhase
 	 */
    export class DeathPhase<P extends IActionParam> extends Action<P> {

        resolvable( context: HsGameCtx ): boolean {
            return Def.SetBuilderHelper.BATTLEFIELD
                .addFilter( Def.StandardFilters.minion )
                .addFilter(( source: ISource, minion: HsEntity, context: HsGameCtx ): boolean => {
                    return minion instanceof HsLogic.Minion
                        && ( minion.hp <= 0
                            || minion.flags.pending_destroy );
                }).buildSet( null, context ).length > 0
        }

        resolve( self: DeathPhase<P>, context: HsGameCtx ): PromiseOfActions {
            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [];


                    // 3. aura Update (Health/Attack) Step
                    actions.push( new AuraUpdateStep( {
                        source: param.source,
                        auraUpdateMode: AURA_UPDATE_MODE.ATTACK_HEALTH
                    }) );


                    // 4. Death Creation Step 
                    actions.push( new DeathCreationStep( { source: param.source }) );


                    // 5. aura Update (Other) Step
                    actions.push( new AuraUpdateStep( {
                        source: param.source,
                        auraUpdateMode: AURA_UPDATE_MODE.OTHER
                    }) );


                    // 4. Process DeathEvents: deathrattle, onDeath, secrets
                    actions.push( new DispatchSavedEvents( event.Death, context ) );


                    // 5. check for pending_destroy or lethal damage and rerun DeathPhase
                    actions.push( new DeathPhase( param ) );


                    resolve( actions );
                });
        }
    }
}