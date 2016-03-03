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
    export class ReturnCardIntoHandFromPlayZone extends HsAction {

        resolve(_this_: ReturnCardIntoHandFromPlayZone, gameEnv: HsGameEnv): PromiseOfActions {
            return new Promise<HsAction[]>(
                (resolve, reject): void => {

                    if (_this_.hand.isFull) {
                        resolve([gameEnv.actionFactory.markAsDestroyed(_this_.source, _this_.card)]);
                    }
                    else {
                        _this_.sourceZone.removeEntity(_this_.card);
                        _this_.hand.addEntity(_this_.card);
                        resolve(null);
                    }
                });
        }

        constructor(source: jsLogic.IAction<HsGameEnv>, public card: Card, public sourceZone: HsZone, public hand: HsZone) {
            super(source);
        };
    }
}