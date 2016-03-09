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

        resolve(_this_: PutCardIntoHand, gameCtx: HsGameCtx): PromiseOfActions {
            return new Promise<HsAction<P>[]>(
                (resolve, reject): void => {
                    let zones: HsZones = gameCtx.zonesOf(_this_.player);


                    if (!zones.hand.isFull) {
                        zones.hand.addEntity(_this_.card);
                        resolve(null);
                    } else {
                        resolve([gameCtx.actionFactory.millCard(_this_.source, _this_.card)]);
                    }
                });
        }

        constructor(source: jsLogic.IAction<HsGameCtx>, public player: Player, public card: Card) {
            super(source);
        };
    }
}