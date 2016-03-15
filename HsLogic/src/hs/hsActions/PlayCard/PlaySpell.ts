///<reference path="../../core/HsAction.ts"/>
///<reference path="../../../core/action/abstractActions/CancelableAction.ts"/>

"use strict";

namespace HsLogic {

    export class OnPlayPhaseEvent extends HsActionEvent<PlayCardParam> {
        static get type(): string { return OnPlayPhaseEvent.name }
    }

    export class OnTargetingPhaseEvent extends HsActionEvent<PlayCardParam> {
        static get type(): string { return OnTargetingPhaseEvent.name }
    }

    export class OnAfterSpellPhaseEvent extends HsActionEvent<PlayCardParam> {
        static get type(): string { return OnAfterSpellPhaseEvent.name }
    }

    /**
     * PlaySpell
     * http://hearthstone.gamepedia.com/Advanced_rulebook#Playing_a_spell
     *
     * Phases:
     *   1. pay & remove from hand - outside action: PlayCard
     *   2. onPlayPhase            - OnPlayPhaseEvent
     *   3. onTargetingPhase       - OnTargetingPhaseEvent
     *   4. spellTextPhase         - trigger: card.playActions
     *   5. onAfterPlaySpell       - OnAfterSpellPhaseEvent
     *   6. win/loss check         - outside action: PlayCard?
 	 */


    export class PlaySpell<P extends PlayCardParam> extends HsAction<P> {

        resolve( _this_: PlaySpell<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            if ( _this_.param.cancelAction.value )
                return Promise.resolve( jsLogic.NO_CONSEQUENCES );

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = _this_.param,
                        actions: jsLogic.IAction<HsGameCtx>[] = [];

                    // step 2 - onPlayPhase
                    actions.push( gameCtx.actionFactory.dispatch( new OnPlayPhaseEvent( param ) ) );

                    actions.push( new InlineAction(
                        ( resolve, reject ): void => {
                            if ( param.cancelAction.value ) {
                                resolve( jsLogic.NO_CONSEQUENCES );
                                return;
                            }

                            let innerActions: jsLogic.IAction<HsGameCtx>[] = [];

                            // step 3 - onTargetingPhase
                            innerActions.push(
                                gameCtx.actionFactory.dispatch( new OnTargetingPhaseEvent( param ) )
                            );

                            // step 4 - spellTextPhase
                            innerActions.push(
                                new ExecuteTriggers( {
                                    source: param.source,
                                    defActions: param.card.playActions,
                                    targets: param.acquiredTargets
                                })
                            );

                            // step 5 - onAfterPlaySpell
                            innerActions.push(
                                gameCtx.actionFactory.dispatch( new OnAfterSpellPhaseEvent( param ) )
                            );

                            resolve( innerActions );
                        }
                    ) ); // new InlineAction(

                    resolve( actions );
                }
            ); // return new Promise

        } // resolve( _this_: PlaySpell<P>

    } // export class PlaySpell
}