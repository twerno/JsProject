///<reference path="../core/HsAction.ts"/>

"use strict";

namespace HSLogic {



    /**
     * ShuffleGeneratedCardIntoDeck
     *
     * #RULE:(Rule Z0) - nothing happens if the deck is full    
     *
 	 * http://hearthstone.gamepedia.com/Generate
 	 * http://hearthstone.gamepedia.com/Advanced_rulebook 
 	 *
 	 */
    export class ShuffleGeneratedCardIntoDeck<P extends PlayerAndCardsParam> extends HsAction<P> {

        resolve(_this_: ShuffleGeneratedCardIntoDeck<P>, gameCtx: HsGameCtx): PromiseOfActions {

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                (resolve, reject): void => {
                    let param: P = _this_.param,
                        deck: HsZone = gameCtx.zonesOf(param.player).deck,
                        added: boolean = false;

                    for (let id in param.cards) {
                        if (!deck.isFull) {
                            deck.addEntity(param.cards[id]);
                            added = true;
                        }
                    }

                    if (added)
                        resolve([gameCtx.actionFactory.shuffleDeck(param)]);
                    else
                        resolve(null);
                });

        }
    }

}