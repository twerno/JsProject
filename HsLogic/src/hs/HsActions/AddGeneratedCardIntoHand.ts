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

        protected baseActionResolver(_this_: AddGeneratedCardIntoHand, gameEnv: HsGameEnv): void {
            if (!_this_.hand.isFull)
                _this_.hand.addEntity(_this_.card);
        }

        constructor(source: jsLogic.IAction<HsGameEnv>, public card: Card, public hand: HsZone) {
            super(source);
        };
    }
}