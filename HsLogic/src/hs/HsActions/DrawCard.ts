///<reference path="../core/HsAction.ts"/>

"use strict";

namespace HsLogic {


    export interface DrawParam extends IActionParam {
        targetPlayer: Player,
        drawnCard: Card
    }

    export class OnCardDraw extends ActionEvent<DrawParam> {
        static get type(): string { return OnCardDraw.name }
    }

    export class OnCardDrawn extends ActionEvent<DrawParam> {
        static get type(): string { return OnCardDrawn.name }
    }

    /**
     * DrawCard
     *
     * http://hearthstone.gamepedia.com/Advanced_rulebook#Drawing_a_Card
     *
     * 1. pick a top card from targets player deck
     * 2. if hand is not full place card in hand, mill it otherwise
     * 3. dispatch on draw event: (Chromaggus, Shadowfiend, The Mistcaller)
     * 4. execute onDrawn trigger if exists
     * 5. dispatch on drawn event: (Sea Reaver, Flame Leviathan, Ambush!, Burrowing Mine, Fatigue)
 	 */
    export class DrawCard<P extends DrawParam> extends Action<P> {

        resolve( self: DrawCard<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        zones: HsZones = gameCtx.zonesOf( param.targetPlayer ),
                        actions: jsLogic.IAction<HsGameCtx>[] = [];

                    param.drawnCard = zones.deck.pop() || null;

                    if ( param.drawnCard ) {
                        if ( !zones.hand.isFull() )
                            zones.hand.addEntity( param.drawnCard );
                        else
                            zones.graveyard.addEntity( param.drawnCard );

                        actions.push(); //gameCtx.actionFactory.dispatch( new OnCardDraw( param ) ) );

                        //                        actions.push( new ExecuteTargetlessTriggers( {
                        //                            source: param.source,
                        //                            defActions: param.drawnCard.triggers.onDrawn
                        //                        }) );

                        actions.push(); //gameCtx.actionFactory.dispatch( new OnCardDrawn( param ) ) );
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