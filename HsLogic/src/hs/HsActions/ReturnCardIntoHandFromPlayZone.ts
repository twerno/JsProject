///<reference path="../core/HsAction.ts"/>

"use strict";

namespace HSLogic {

    /**
     * ReturnCardIntoHandFromPlayZone
     *
	 * Put non generated card into hand.
	 * If the hand is full DESTROY IT (deathrattle etc)
 	 *
 	 */
    export class ReturnCardIntoOwnersHandFrom extends HsAction {

        resolve(_this_: ReturnCardIntoOwnersHandFrom, gameCtx: HsGameCtx): PromiseOfActions {
            return new Promise<HsAction[]>(
                (resolve, reject): void => {
                    let hand: HsZone = gameCtx.zonesOf(_this_.card.owner).hand;

                    if (hand.isFull) {
                        resolve([gameCtx.actionFactory.markAsDestroyed(_this_.source, _this_.card)]);
                    }
                    else {
                        _this_.sourceZone.removeEntity(_this_.card);
                        hand.addEntity(_this_.card);
                        resolve(null);
                    }
                });
        }

        constructor(source: jsLogic.IAction<HsGameCtx>, public sourceZone: HsZone, public card: Card) {
            super(source);
        };
    }
}