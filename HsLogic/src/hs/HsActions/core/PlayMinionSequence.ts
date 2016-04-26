/// <reference path="../../core/action.ts" />
/// <reference path="../../core/actionevent.ts" />

"use strict";

namespace HsLogic {

    export interface SummonMinionParam extends IActionParam {
        card: Minion,
        position: number
    }

    export namespace event {

        /**
         *  Summon
         *  http://hearthstone.gamepedia.com/Advanced_rulebook#Summon_Resolution_Step
         *  Examples:
         *    if the minion associated with a Summon Event is no longer in play at the time it is resolved, then nothing queues
         */
        export class GenSummonMinionEvent<P extends SummonMinionParam> extends ActionEvent<P> {
            valid( gameCtx: HsGameCtx ): boolean {
                return gameCtx.gameBoard.zonesOf( this.param.card.owner )
                    .battlefield.has( this.param.card );
            }
        }


        export class PreSummonReactionBugEvent extends ActionEvent<SummonMinionParam> { }


        export class Summon extends GenSummonMinionEvent<SummonMinionParam> {

            //valid( gameCtx: HsGameCtx ): boolean {
            //    let card: Card = this.param.card;
            //    return gameCtx.gameBoard.zonesOf( card.owner ).battlefield.has( card );
            //}

        }



        export class AfterPlay extends GenSummonMinionEvent<SummonMinionParam> { }



        export class AfterSummon extends GenSummonMinionEvent<SummonMinionParam> { }
    }

    /**
     * PlayMinion
     * http://hearthstone.gamepedia.com/Advanced_rulebook#Playing.2Fsummoning_a_minion
     *
     * Phases:
     *   0. pay & remove from hand  -
     *   1. pre-summon reaction bug - 
     *   2. enters the battlefied 
     *   3. create SummonEvent 
     *   4. onPlayPhase             - EventAfterPlayPhase
     *   5. Battlecry Phase         - 
     *   6. After Play Phase        - 
     *   7. After Summon Phase      - EventAfterSummon
     *   8. win/loss check          - outside action: PlayCard?
       */
    export class PlayMinionSequence<P extends PlayMinionParam> extends Action<P> {

        resolve( self: PlayMinionSequence<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<ActionType | ActionType[]>(

                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [];

                    // pay cost & remove from hand
                    actions.push( gameCtx.actionFactory.payCostAndRemoveFromHand( param ) );

                    // pre summon reaction bug
                    // http://hearthstone.gamepedia.com/Advanced_rulebook#Cobalt_Guardian.2FMurloc_Tidecaller_Pre-Summon_Reaction_Bug
                    actions.push( new event.PreSummonReactionBugEvent( param ).dispatch( gameCtx ) );

                    // 2. enters the battlefied
                    actions.push( new InlineAction(( resolve, reject ): void => {
                        gameCtx.gameBoard.zonesOf( param.card.owner ).battlefield.addEntity( param.card, param.position );
                        resolve( jsAction.NO_CONSEQUENCES );
                    }) );

                    //@TODO interrupt following phases if then minion dies (battlecry still goes)

                    // 3. create SummonEvent 
                    gameCtx.eventMgr.save( new event.Summon( param ) );


                    // 4. onPlayPhase
                    actions.push( new DispatchEvent( new OnPlayPhaseEvent( param ) ) );
                    actions.push( new OutermostPhaseEnd( { source: param.source }) );


                    // 5. Battlecry Phase
                    actions.push( new Battlecry( param ) );
                    actions.push( new OutermostPhaseEnd( { source: param.source }) );

                    // the Death Creation Step and Summon Resolution Step are skipped

                    // 6. After Play Phase
                    actions.push( new DispatchEvent( new OnPlayPhaseEvent( param ) ) );

                    // 7. After Summon Phase
                    actions.push( new DispatchEvent( new event.AfterSummon( param ) ) );

                    resolve( actions );
                }

            ); // return new Promise
        } // resolve(self: PlayMinion

    } // export class PlayMinion
}