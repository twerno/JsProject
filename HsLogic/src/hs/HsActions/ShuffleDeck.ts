"use strict";

namespace HSLogic {

    /**
     * ShuffleDeck
	 *
 	 */
    export class ShuffleDeck extends HsBaseAction {

        protected baseActionResolver(_this_: ShuffleDeck, gameCtx: HsGameCtx): void {
            let deck: HsZone = gameCtx.zonesOf(_this_.deckOwner).deck;
            MathUtils.randomizeArray(deck.getRawArray());
        }

        constructor(source: jsLogic.IAction<HsGameCtx>, public deckOwner: Player) {
            super(source);
        };
    }
}