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
    export class ShuffleGeneratedCardIntoDeck extends HsAction {

        resolve(_this_: ShuffleGeneratedCardIntoDeck, gameEnv: HsGameEnv): PromiseOfActions {
            return new Promise<HsAction[]>(
                (resolve, reject): void => {
                    let deck: HsZone = gameEnv.zonesOf(_this_.deckOwner).deck;
                    let added: boolean = false;

                    for (let id in _this_.cards) {
                        if (!deck.isFull) {
                            deck.addEntity(_this_.cards[id]);
                            added = true;
                        }
                    }

                    if (added)
                        resolve([gameEnv.actionFactory.shuffleDeck(_this_.source, _this_.deckOwner)]);
                    else
                        resolve(null);
                });

        }

        constructor(source: jsLogic.IAction<HsGameEnv>, public cards: Card[], public deckOwner: Player) {
            super(source);
        };
    }

}