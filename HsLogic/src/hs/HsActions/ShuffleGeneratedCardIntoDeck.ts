///<reference path="../HsAction.ts"/>

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
    export class ShuffleGeneratedCardIntoDeck extends HsAction {

        resolve(param: HsActionParam): PromiseOfActions {
            return new Promise<HsAction[]>(
                (resolve, reject): void => {

                    let added: boolean = false;

                    for (let card in this.cards) {
                        if (!this.deck.isFull) {
                            this.deck.addEntity(card);
                            added = true;
                        }
                    }

                    if (added)
                        resolve([new ShuffleDeck(this.source, this.deck)]);
                    else
                        resolve(null);
                });

        }

        constructor(source: jsLogic.IAction<HsActionParam>, public cards: Card[], public deck: HsZone) {
            super(source);
        };
    }

}