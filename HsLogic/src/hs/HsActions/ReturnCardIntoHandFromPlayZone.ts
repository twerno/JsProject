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

        resolve(param: HsActionParam): PromiseOfActions {
            return new Promise<HsAction[]>(
                (resolve, reject): void => {

                    if (this.hand.isFull) {
                        resolve([new MarkAsDestroyed(this.source, this.card)]);
                    }
                    else {
                        this.sourceZone.removeEntity(this.card);
                        this.hand.addEntity(this.card);
                        resolve(null);
                    }
                });
        }

        constructor(source: jsLogic.IAction<HsActionParam>, public card: Card, public sourceZone: HsZone, public hand: HsZone) {
            super(source);
        };
    }
}