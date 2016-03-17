"use strict";

namespace HsLogic {

    /**
     * DispatchEvent
     * http://hearthstone.gamepedia.com/Advanced_rulebook#Dominant_Player_Bug
     *
 	 */


    export class DispatchEvent<P extends IActionParam> extends Action<P> {

        constructor( public event: ActionEvent<P> ) {
            super( event.param )
        }

        resolve( self: DispatchEvent<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: jsLogic.IAction<HsGameCtx>[] = [],
                        triggers: Trigger[];

                    // Dominant Player Queue === active player (for case of debugging)
                    triggers = new Def.TriggerSetBuilder( self.event )
                        .addFilter( Def.TriggerFilter.OWNER( gameCtx.activePlayer ).owns_trigger )
                        .buildSet<Trigger>( param.source, gameCtx );
                    // execute events - remember executed





                }
            ); // return new Promise

        } // resolve( self: PlaySpell<P>

    } // export class SummonResolutionStep


    interface QueueParam extends IActionParam {
        event: ActionEvent<IActionParam>,
        queue: Trigger[],
        triggered: Trigger[]
    }

    class TriggersQueue<P extends QueueParam> extends Action<P> {

        resolve( self: TriggersQueue<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: jsLogic.IAction<HsGameCtx>[],
                        trigger: Def.IDefTriggerImpl;

                    for ( let i = 0; i < param.queue.length; i++ ) {
                        let trigger = param.queue[i];

                        actions.push( new InlineAction(( resolve, reject ): void => {
                            if ( trigger.triggerable( trigger, param.event.param, gameCtx ) ) {
                                param.triggered.push( trigger );
                                resolve( trigger.actions( trigger, param.event.param, gameCtx ) );
                            }

                        }) );
                    }

                }
            );
        }
    }
}