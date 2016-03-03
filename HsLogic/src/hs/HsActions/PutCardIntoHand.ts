///<reference path="../core/HsAction.ts"/>

"use strict";

namespace HSLogic {

    /**
     * AddGeneratedCardIntoHand
     *
	 * Put non generated card into hand.
	 * If the hand is full move it to graveyard instead
 	 *
 	 */
    export class PutCardIntoHand extends HsAction {

        resolve(_this_: PutCardIntoHand, gameEnv: HsGameEnv): PromiseOfActions {
            return new Promise<HsAction[]>(
                (resolve, reject): void => {

                    if (!_this_.zones.hand.isFull) {
                        _this_.zones.hand.addEntity(_this_.card);
                        resolve(null);
                    } else {
                        resolve([gameEnv.actionFactory.millCard(_this_.source, _this_.card, _this_.zones.graveyard)]);
                    }
                });

        }

        constructor(source: jsLogic.IAction<HsGameEnv>, public card: Card, public zones: HsZones) {
            super(source);
        };
    }
}