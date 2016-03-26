"use strict";

namespace HsLogic {

    /**
     * DispatchEvent
     * http://hearthstone.gamepedia.com/Advanced_rulebook#Dominant_Player_Bug
     * http://hearthstone.gamepedia.com/Advanced_rulebook#Glossary
     *   - Humble safeguard: Minions are not allowed to trigger on themselves entering play. 
     *   - Double safeguard: Minions are not allowed to trigger twice on the same Event.
 	 */


    export class DispatchEvent extends Action<IActionParam> {

        constructor( public event: ActionEvent<IActionParam> ) {
            super( null )
        }


        resolvable( context: HsGameCtx ): boolean {
            return this.event
                && this.event.valid( context );
        }


        resolve( self: DispatchEvent, context: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: IActionParam = self.event.param,
                        actions: ActionType[] = [],
                        triggers: Trigger[],
                        doneByDominantPlayer: Trigger[] = [];

                    // Dominant Player === active player (for sake of simplicity)
                    // Dominant Player Triggers
                    triggers = self._getDominantPlayerTriggers( context.activePlayer )
                        .buildSet<Trigger>( param.source, context );

                    // Dominant Player Queue
                    actions.push( new ProcessQueue( {
                        source: param.source,
                        event: self.event,
                        triggers: triggers,
                        done: doneByDominantPlayer
                    }) );


                    // Secondary Player Queue
                    actions.push( new InlineAction(( resolve, reject ): void => {

                        // Double safeguard
                        // Subtrack triggers that already had been triggered by dominant player
                        triggers = self._getSecondaryPlayerTriggers( context.activePlayer, doneByDominantPlayer )
                            .buildSet<Trigger>( param.source, context );

                        // Secondary Player Queue
                        actions.push( new ProcessQueue( {
                            source: param.source,
                            event: self.event,
                            triggers: triggers,
                            done: []
                        }) );
                    }) );

                }

            ); // return new Promise
        }
        // resolve( self: DispatchEvent<P>


        protected _getDominantPlayerTriggers( player: Player ): Def.IDefSetBuilder {
            return new Def.TriggerSetBuilder( this.event )
                .addFilter( Def.TriggerFilter.OWNER( player ).owns_trigger );
        }


        protected _getSecondaryPlayerTriggers( player: Player, triggeredByDominantPlayer: Trigger[] ): Def.IDefSetBuilder {
            return new Def.TriggerSetBuilder( this.event )
                .addFilter( Def.TriggerFilter.OWNER( player ).DOES_NOT_own_trigger )
                .addFilter(( source: ISource, trigger: Trigger, context: HsGameCtx ): boolean => {
                    return triggeredByDominantPlayer.indexOf( trigger ) === -1;
                });
        }
    }



    interface QueueParam extends IActionParam {
        event: ActionEvent<IActionParam>,
        triggers: Trigger[],
        done: Trigger[]
    }


    class ProcessQueue<P extends QueueParam> extends Action<P> {

        resolve( self: ProcessQueue<P>, context: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[],
                        trigger: Def.IDefTriggerImpl;

                    for ( let i = 0; i < param.triggers.length; i++ ) {
                        let trigger = param.triggers[i];

                        actions.push( new InlineAction(
                            ( resolve, reject ): void => {
                                if ( !trigger.triggerable( trigger, param.event, context ) )
                                    return;

                                param.done.push( trigger );
                                resolve( trigger.actions( trigger, param.event, context ) );
                            }
                        ) );
                    }
                    resolve( actions );
                });
        }
    }
}