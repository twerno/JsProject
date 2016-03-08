///<reference path="../core/HsAction.ts"/>

"use strict";

namespace HSLogic {

    /**
     * AddGeneratedCardIntoHand
     *
     * #RULE:(Rule Z0) - nothing happens if the hand is full
     *
 	 * http://hearthstone.gamepedia.com/Generate
 	 * http://hearthstone.gamepedia.com/Advanced_rulebook 
 	 *
 	 */
    export class AddGeneratedCardIntoHand extends HsBaseAction {

        protected baseActionResolver(_this_: AddGeneratedCardIntoHand, gameCtx: HsGameCtx): void {
            let hand: HsZone = gameCtx.zonesOf(_this_.player).hand;
            if (!hand.isFull)
                hand.addEntity(_this_.card);
        }

        constructor(source: jsLogic.IAction<HsGameCtx>, public player: Player, public card: Card) {
            super(source);
        };
    }
}