///<reference path="../HsAction.ts"/>

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

        protected baseActionResolver(_this_: AddGeneratedCardIntoHand, param: HsActionParam): void {
            if (!_this_.hand.isFull)
                _this_.hand.addEntity(_this_.card);
        }

        constructor(source: jsLogic.IAction<HsActionParam>, public card: Card, public hand: HsZone) {
            super(source);
        };
    }
}