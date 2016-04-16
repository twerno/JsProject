/// <reference path="../../core/action.ts" />

"use strict";

namespace HsLogic {

    export class OnPlayPhaseEvent extends ActionEvent<PlayCardParam> {
        static get type(): string { return OnPlayPhaseEvent.name }
    }

    export class OnTargetingPhaseEvent extends ActionEvent<PlayCardParam> {
        static get type(): string { return OnTargetingPhaseEvent.name }
    }

    export class OnAfterSpellPhaseEvent extends ActionEvent<PlaySpellParam> {
        static get type(): string { return OnAfterSpellPhaseEvent.name }
    }

    /**
     * PlaySpell
     * http://hearthstone.gamepedia.com/Advanced_rulebook#Playing_a_spell
     *
     * Phases:
     *   1. pay & remove from hand - 
     *   2. onPlayPhase            - OnPlayPhaseEvent
     *   3. onTargetingPhase       - OnTargetingPhaseEvent
     *   4. spellTextPhase         - trigger: card.playActions
     *   5. onAfterPlaySpell       - OnAfterSpellPhaseEvent
     *   6. win/loss check         - outside action: PlayCard?
 	 */


    export class PlaySpellSequence<P extends PlaySpellParam> extends Action<P> {

        resolve( self: PlaySpellSequence<P>, context: HsGameCtx ): PromiseOfActions {
            if ( self.param.cancelAction.value )
                return Promise.resolve( jsLogic.NO_CONSEQUENCES );

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [];

                    // pay cost & remove from hand
                    actions.push( context.actionFactory.payCostAndRemoveFromHand( param ) );

                    // step 2 - onPlayPhase
                    actions.push(); //context.actionFactory.dispatch( new OnPlayPhaseEvent( param ) ) );
                    actions.push( new OutermostPhaseEnd( { source: param.source }) );


                    actions.push( new InlineActionExt(
                        (): boolean => {
                            return !param.cancelAction.value
                        },
                        ( resolve, reject ): void => {
                            let innerActions: ActionType[] = [];

                            // step 3 - onTargetingPhase
                            // the Death Creation Step and Summon Resolution Step are skipped
                            innerActions.push(); //context.actionFactory.dispatch( new OnTargetingPhaseEvent( param ) ) );


                            // step 4 - spellTextPhase
                            if ( param.card.spellAction )
                                innerActions.concat(
                                    param.card.spellAction.actionBuilder( param.card.getSource(), param.targets, context ) );


                            // step 5 - onAfterPlaySpell
                            innerActions.push(); //context.actionFactory.dispatch( new OnAfterSpellPhaseEvent( param ) ) );

                            resolve( innerActions );
                        }
                    ) ); // new InlineAction(

                    resolve( actions );
                }
            ); // return new Promise

        } // resolve( self: PlaySpell<P>

    } // export class PlaySpell
}