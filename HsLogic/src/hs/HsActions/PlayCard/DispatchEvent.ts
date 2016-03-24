"use strict";

namespace HsLogic {

    /**
     * DispatchEvent
     * http://hearthstone.gamepedia.com/Advanced_rulebook#Dominant_Player_Bug
     * http://hearthstone.gamepedia.com/Advanced_rulebook#Glossary
     *   - Humble safeguard: Minions are not allowed to trigger on themselves entering play. 
     *   - Double safeguard: Minions are not allowed to trigger twice on the same Event.
 	 */


    export class DispatchEvent<P extends IActionParam> extends Action<P> {

        constructor( public event: ActionEvent<P> ) {
            super( event.param )
        }


        resolve( self: DispatchEvent<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            if ( !self.event.valid( gameCtx ) )
                return Promise.resolve( [] );

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: jsLogic.IAction<HsGameCtx>[] = [],
                        triggers: Trigger[],
                        triggeredByDominantPlayer: Trigger[] = [];

                    // Dominant Player === active player (for sake of simplicity)
                    // Dominant Player Triggers
                    triggers = self._getDominantPlayerTriggers( gameCtx.activePlayer )
                        .buildSet<Trigger>( param.source, gameCtx );

                    // Dominant Player Queue
                    actions.push( new TriggerQueue( {
                        source: param.source,
                        event: self.event,
                        triggers: triggers,
                        triggered: triggeredByDominantPlayer
                    }) );


                    // Secondary Player Queue
                    actions.push( new InlineAction(( resolve, reject ): void => {

                        // Double safeguard
                        // Subtrack triggers that already had been triggered by dominant player
                        triggers = self._getSecondaryPlayerTriggers( gameCtx.activePlayer, triggeredByDominantPlayer )
                            .buildSet<Trigger>( param.source, gameCtx );

                        // Secondary Player Queue
                        actions.push( new TriggerQueue( {
                            source: param.source,
                            event: self.event,
                            triggers: triggers,
                            triggered: []
                        }) );
                    }) );

                }

            ); // return new Promise
        }
        // resolve( self: PlaySpell<P>


        protected _getDominantPlayerTriggers( player: Player ): Def.IDefSetBuilder {
            return new Def.TriggerSetBuilder( this.event )
                .addFilter( Def.TriggerFilter.OWNER( player ).owns_trigger );
        }


        protected _getSecondaryPlayerTriggers( player: Player, triggeredByDominantPlayer: Trigger[] ): Def.IDefSetBuilder {
            return new Def.TriggerSetBuilder( this.event )
                .addFilter( Def.TriggerFilter.OWNER( player ).DOES_NOT_own_trigger )
                .addFilter(( source: ISource, trigger: Trigger, gameCtx: HsGameCtx ): boolean => {
                    return triggeredByDominantPlayer.indexOf( trigger ) === -1;
                });
        }
    }
    // export class SummonResolutionStep


    interface QueueParam extends IActionParam { event: ActionEvent<IActionParam>, triggers: Trigger[], triggered: Trigger[] }

    class TriggerQueue<P extends QueueParam> extends Action<P> {
        resolve( self: TriggerQueue<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(( resolve, reject ): void => {
                let param: P = self.param, actions: jsLogic.IAction<HsGameCtx>[], trigger: Def.IDefTriggerImpl;
                for ( let i = 0; i < param.triggers.length; i++ ) {
                    let trigger = param.triggers[i];
                    actions.push( new InlineAction(( resolve, reject ): void => { if ( trigger.triggerable( trigger, param.event, gameCtx ) ) { param.triggered.push( trigger ); resolve( trigger.actions( trigger, param.event, gameCtx ) ); } }) );
                }
                resolve( actions );
            });
        }
    }
}