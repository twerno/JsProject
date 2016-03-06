"use strict";

namespace HSLogic {

    /**
     * ShuffleDeck
	 *
 	 */
    export class ShuffleDeck extends HsBaseAction {

        protected baseActionResolver(_this_: ShuffleDeck, gameEnv: HsGameEnv): void {
            let deck: HsZone = gameEnv.zonesOf(_this_.deckOwner).deck;
            MathUtils.randomizeArray(deck.getRawArray());
        }

        constructor(source: jsLogic.IAction<HsGameEnv>, public deckOwner: Player) {
            super(source);
        };
    }
}