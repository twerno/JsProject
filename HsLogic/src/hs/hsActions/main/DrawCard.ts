/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {


    export interface DrawParam extends IActionParam {
        targetPlayer: Player,
        drawnCard?: Card,
    }


    /**
     * DrawCard
     *
     * http://hearthstone.gamepedia.com/Advanced_rulebook#Drawing_a_Card
     *
     * 1. pick a top card from targets player deck
     * 2.   if hand is not full place card in hand, mill it otherwise
     * 3.   dispatch on draw event: (Chromaggus, Shadowfiend, The Mistcaller)
     * 4.   dispatch on drawn event: (Sea Reaver, Flame Leviathan, Ambush!, Burrowing Mine)
     * 5. Fatigue if no card had beed drawn
 	 */
    export class DrawCard<P extends DrawParam> extends Action<P> {

        resolve( self: DrawCard<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        zones: Zones = gameCtx.gameBoard.zonesOf( param.targetPlayer ),
                        actions: ActionType[] = [];

                    param.drawnCard = zones.deck.pop() || null;

                    if ( param.drawnCard ) {
                        if ( !zones.hand.isFull() ) {
                            zones.hand.addEntity( param.drawnCard );

                            actions.push( new event.CardDrawGlobalEvent( param ).dispatch( gameCtx ) );

                            actions.push( new event.CardDrawSelfEvent( param ).dispatch( gameCtx ) );

                        }
                        else
                            zones.graveyard.addEntity( param.drawnCard );
                    }
                    else
                        actions.push( gameCtx.actionFactory.fatigue( {
                            source: param.source,
                            player: param.targetPlayer
                        }) );

                    resolve( actions );
                }
            );
        }
    }


}