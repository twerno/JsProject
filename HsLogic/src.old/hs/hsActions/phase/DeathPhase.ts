/// <reference path="../../core/action.ts" />
/// <reference path="../../core/ActionEvent.ts" />

"use strict";

namespace HsLogic {

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

        resolvable( gameCtx: HsGameCtx ): boolean {
            return Def.TargetFinder.ANY_MINION
                .addFilter(( source: ISource, minion: Entity, gameCtx: HsGameCtx ): boolean => {
                    return minion instanceof HsLogic.Minion
                        && ( minion.body.hp() <= 0
                            || minion.tags.contains( Def.Pending_Destroy_Tag ) );
                }).buildSet( null, gameCtx ).length > 0
        }

        resolve( self: DeathPhase<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [];


                    // 3. aura Update (Health/Attack) Step
                    actions.push( new AuraUpdateStep( {
                        source: param.source,
                        auraType: Def.AURA_TYPE.ATTACK_HEALTH
                    }) );


                    // 4. Death Creation Step
                    //    Remove Minions
                    //    Create DeatchEvent for each removed
                    actions.push( new DeathCreationStep( { source: param.source }) );


                    // 5. aura Update (Other) Step
                    actions.push( new AuraUpdateStep( {
                        source: param.source,
                        auraType: Def.AURA_TYPE.OTHER
                    }) );


                    // 4. Process DeathEvents: deathrattle, onDeath, secrets
                    actions.push( new DispatchSavedEvents( event.Death, gameCtx ) );


                    // 5. check for pending_destroy or lethal damage and rerun DeathPhase
                    actions.push( new DeathPhase( param ) );


                    resolve( actions );
                });
        }
    }
}