///<reference path="../HsAction.ts"/>

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

        resolve(param: HsActionParam): PromiseOfActions {
            return new Promise<HsAction[]>(
                (resolve, reject): void => {

                    if (!this.zones.hand.isFull) {
                        this.zones.hand.addEntity(this.card);
                        resolve(null);
                    } else {
                        resolve([new MillCard(this.source, this.card, this.zones.graveyard)]);
                    }
                });

        }

        constructor(source: jsLogic.IAction<HsActionParam>, public card: Card, public zones: HsZones) {
            super(source);
        };
    }
}