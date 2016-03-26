///<reference path="../core/HsAction.ts"/>

"use strict";

namespace HsLogic {



    /**
     * ShuffleGeneratedCardIntoDeck
     *
     * #RULE:(Rule Z0) - nothing happens if the deck is full    
     *
 	 * http://hearthstone.gamepedia.com/Generate
 	 * http://hearthstone.gamepedia.com/Advanced_rulebook 
 	 *
 	 */
    export class ShuffleGeneratedCardIntoDeck<P extends PlayerAndCardsParam> extends Action<P> {

        resolve( self: ShuffleGeneratedCardIntoDeck<P>, context: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        deck: HsZone<Card> = context.zonesOf( param.player ).deck,
                        added: boolean = false;

                    for ( let id in param.cards ) {
                        if ( !deck.isFull ) {
                            deck.addEntity( param.cards[id] );
                            added = true;
                        }
                    }

                    if ( added )
                        resolve( [context.actionFactory.shuffleDeck( param )] );
                    else
                        resolve( null );
                });

        }
    }

}