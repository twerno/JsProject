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

        resolve(_this_: ShuffleGeneratedCardIntoDeck, param: HsActionParam): PromiseOfActions {
            return new Promise<HsAction[]>(
                (resolve, reject): void => {

                    let added: boolean = false;

                    for (let id in _this_.cards) {
                        if (!_this_.deck.isFull) {
                            _this_.deck.addEntity(_this_.cards[id]);
                            added = true;
                        }
                    }

                    if (added)
                        resolve([new ShuffleDeck(_this_.source, _this_.deck)]);
                    else
                        resolve(null);
                });

        }

        constructor(source: jsLogic.IAction<HsActionParam>, public cards: Card[], public deck: HsZone) {
            super(source);
        };
    }

}