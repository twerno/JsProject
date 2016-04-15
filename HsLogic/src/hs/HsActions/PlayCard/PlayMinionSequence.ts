/// <reference path="../../core/action.ts" />

"use strict";

namespace HsLogic {

    export namespace event {

        /**
         *  Summon
         *  http://hearthstone.gamepedia.com/Advanced_rulebook#Summon_Resolution_Step
         *  Examples:
         *    if the minion associated with a Summon Event is no longer in play at the time it is resolved, then nothing queues
         */
        export class GenSummonMinionEventextends<P extends PlayCardParam> extends ActionEvent<P> {
            valid( context: HsGameCtx ): boolean {
                return context.zonesOf( this.param.card.owner )
                    .battlefield.has( this.param.card );
            }
        }


        export class PreSummon extends ActionEvent<PlayMinionParam> { }


        export class Summon extends GenSummonMinionEventextends<PlayMinionParam> {

            //valid( context: HsGameCtx ): boolean {
            //    let card: Card = this.param.card;
            //    return context.zonesOf( card.owner ).battlefield.has( card );
            //}

        }



        export class AfterPlay extends GenSummonMinionEventextends<PlayCardParam> { }



        export class AfterSummon extends GenSummonMinionEventextends<PlayMinionParam> { }
    }

    /**
     * PlayMinion
     * http://hearthstone.gamepedia.com/Advanced_rulebook#Playing.2Fsummoning_a_minion
     *
     * Phases:
     *   1. pay & remove from hand - 
     *   2. enters the battlefied 
     *   3. create SummonEvent 
     *   4. onPlayPhase            - EventAfterPlayPhase
     *   5. Battlecry Phase        - 
     *   6. After Play Phase       - 
     *   7. After Summon Phase     - EventAfterSummon
     *   8. win/loss check         - outside action: PlayCard?
       */
    export class PlayMinionSequence<P extends PlayMinionParam> extends Action<P> {

        resolve( self: PlayMinionSequence<P>, context: HsGameCtx ): PromiseOfActions {
            return new Promise<ActionType | ActionType[]>(

                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [];

                    // pay cost & remove from hand
                    actions.push( context.actionFactory.payCostAndRemoveFromHand( param ) );

                    // 2. enters the battlefied  
                    context.zonesOf( param.card.owner ).battlefield.addEntity( param.card, param.position );

                    // pre summon reaction bug
                    // http://hearthstone.gamepedia.com/Advanced_rulebook#Cobalt_Guardian.2FMurloc_Tidecaller_Pre-Summon_Reaction_Bug

                    //@TODO interrupt following phases if then minion dies (battlecry still goes)

                    // 3. create SummonEvent 
                    context.eventMgr.save( new event.Summon( param ) );


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