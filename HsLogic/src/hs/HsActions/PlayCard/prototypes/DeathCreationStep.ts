"use strict";

namespace HsLogic {

    export interface DeathParam extends IActionParam {
        target: Character | Weapon,
        position: number
    }

    export namespace event {
        export class Death<P extends DeathParam> extends ActionEvent<P> { }
    }

    /**
     * DeathCreationStep
     * http://hearthstone.gamepedia.com/Advanced_rulebook#Death_Phases_and_consequences_of_Death
     *
     * Part of death phases
     *
     * Looks for all mortally wounded (0 or less Health)/pending destroy (hit with a destroy effect) and remove them from play
 	 */
    export class DeathCreationStep<P extends IActionParam> extends Action<P> {

        resolve( self: DeathCreationStep<P>, context: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [],
                        source: ISource;

                    // find minions to be destroyed
                    let minions: Minion[] = Def.TargetFinder.ANY_MINION
                        .addFilter(( source: ISource, minion: HsEntity, context: HsGameCtx ): boolean => {
                            return minion instanceof HsLogic.Minion
                                && ( minion.body.hp() <= 0
                                    || minion.tags.has( Def.Pending_Destroy_Tag ) );
                        }).buildSet( null, context );

                    // process them
                    for ( let i = 0; i < minions.length; i++ ) {

                        source = minions[i].tags.getFirstSource( Def.Pending_Destroy_Tag )
                        if ( !source )
                            source = context.lethalMonitor.getSourceFor( minions[i] );

                        context.eventMgr.save( new event.Death( {
                            source: source,
                            target: minions[i],
                            position: 0
                        }) );

                        //  remove from battlefield
                        context.zonesOf( minions[i].owner ).battlefield.removeEntity( minions[i] );
                    }

                    resolve( jsLogic.NO_CONSEQUENCES );
                });
        }
    }
}