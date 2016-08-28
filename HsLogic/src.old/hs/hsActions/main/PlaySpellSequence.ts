/// <reference path="../../core/action.ts" />
/// <reference path="../../core/actionEvent.ts" />

"use strict";

namespace HsLogic {


    export class OnTargetingPhaseEvent extends CancelableEvent<PlayCardParam> {
        static get type(): string { return OnTargetingPhaseEvent.name }
    }

    export class OnAfterSpellPhaseEvent extends CancelableEvent<PlaySpellParam> {
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


    export class PlaySpellSequence<P extends PlaySpellParam> extends CancelableAction<P> {

        resolve( self: PlaySpellSequence<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [];

                    // pay cost & remove from hand
                    actions.push( gameCtx.actionFactory.payCostAndRemoveFromHand( param ) );

                    // step 2 - onPlayPhase
                    actions.push( gameCtx.phaseActionFactory.playPhase( param ) );
                    actions.push( new OutermostPhaseEnd( { source: param.source }) );


                    actions.push( new InlineActionExt(

                        (): boolean => !param.cancelAction.value,

                        ( resolve, reject ): void => {
                            let actions: ActionType[] = [];

                            // step 3 - onTargetingPhase
                            // the Death Creation Step and Summon Resolution Step are skipped
                            actions.push( new OnTargetingPhaseEvent( param ).dispatch( gameCtx ) );


                            // step 4 - spellTextPhase
                            if ( param.card.spellAction
                                && ( !param.card.spellAction.executable
                                    || param.card.spellAction.executable( param.source, param.targets, gameCtx ) ) )
                                actions = actions.concat( param.card.spellAction.actionBuilder( param.source, param.targets, gameCtx ) );

                            // step 5 - onAfterPlaySpell
                            actions.push( new OnAfterSpellPhaseEvent( param ).dispatch( gameCtx ) );

                            // step 6 - win/loss check, close sequence
                            actions.push( new OutermostPhaseEnd( { source: param.source }) );

                            resolve( actions );
                        }
                    ) ); // new InlineAction(

                    resolve( actions );
                }
            ); // return new Promise

        } // resolve( self: PlaySpell<P>

    } // export class PlaySpell
}