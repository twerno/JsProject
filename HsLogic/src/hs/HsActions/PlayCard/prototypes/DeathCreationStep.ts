"use strict";

namespace HsLogic {

    export interface DeathParam extends IActionParam {
        target: Character
    }

    export namespace event {
        export class Death<P extends DeathParam> extends ActionEvent<P> { }
    }

    /**
     * DeathCreationStep
     * http://hearthstone.gamepedia.com/Advanced_rulebook#Death_Phases_and_consequences_of_Death
     *
     * 1. Aura Update (Health/Attack)
     * 2. Looks for all mortally wounded (0 or less Health)/pending destroy (hit with a destroy effect) and remove them from play
     * 3. Aura Update (Other)
 	 */
    export class DeathCreationStep<P extends IActionParam> extends Action<P> {

        resolve( self: DeathCreationStep<P>, context: HsGameCtx ): PromiseOfActions {

            //resolvable( context: HsGameCtx ): boolean {
            //    return context.eventMgr.has(event.) .summon.length !== 0;
            //}

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [];

                    // 1. aura Update (Health/Attack) Step
                    //                    actions.push( new AuraUpdateStep( {
                    //                        source: param.source,
                    //                        auraUpdateMode: AURA_UPDATE_MODE.ATTACK_HEALTH
                    //                    }) );

                    let minions: Minion[] = Def.SetBuilderHelper.BATTLEFIELD
                        .addFilter( Def.StandardFilters.minion )
                        .addFilter(( source: ISource, minion: HsEntity, context: HsGameCtx ): boolean => {
                            return minion instanceof HsLogic.Minion
                                && ( minion.hp <= 0
                                    || minion.flags.pending_destroy );
                        }).buildSet<Minion>( param.source, context );

                    for ( let i = 0; i < minions.length; i++ ) {



                        context.eventMgr.save( new event.Death( {
                            source: param.source, //@TODO: real death source: pending_destroy source, or lethal damage source
                            target: minions[i]
                        }) )
                    }


                    // 3. aura Update (Other) Step
                    //                    actions.push( new AuraUpdateStep( {
                    //                        source: param.source,
                    //                        auraUpdateMode: AURA_UPDATE_MODE.OTHER
                    //                    }) );

                    actions.push( new InlineAction(( resolve, reject ): void => {
                        resolve( true ? new DeathCreationStep( param ) : jsLogic.NO_CONSEQUENCES );
                    }) );

                    resolve( null );
                });
        }
    }
}