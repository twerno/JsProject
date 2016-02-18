///<reference path="../HsAction.ts"/>

"use strict";

namespace HSLogic {
	
    /**
     * ReturnCardIntoHandFromPlayZone
     *
	 * Put non generated card into hand.
	 * If the hand is full DESTROY IT (deathrattle etc)
 	 *
 	 */
    export class ReturnCardIntoHandFromPlayZone extends HsAction {

        resolve(_this_: ReturnCardIntoHandFromPlayZone, param: HsActionParam): PromiseOfActions {
            return new Promise<HsAction[]>(
                (resolve, reject): void => {

                    if (_this_.hand.isFull) {
                        resolve([new MarkAsDestroyed(_this_.source, _this_.card)]);
                    }
                    else {
                        _this_.sourceZone.removeEntity(_this_.card);
                        _this_.hand.addEntity(_this_.card);
                        resolve(null);
                    }
                });
        }

        constructor(source: jsLogic.IAction<HsActionParam>, public card: Card, public sourceZone: HsZone, public hand: HsZone) {
            super(source);
        };
    }
}