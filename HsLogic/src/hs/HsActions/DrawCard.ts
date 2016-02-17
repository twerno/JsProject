///<reference path="../HsAction.ts"/>

"use strict";

namespace HSLogic {

    /**
     * DrawCard
     *
 	 */
    export class DrawCard extends HsAction {

        resolve(param: HsActionParam): PromiseOfActions {
            return new Promise<HsAction[]>(
                (resolve, reject): void => {

                    // fatigue
                    if (this.zones.deck.isEmpty()) {
                        resolve([new Fatigue(this.source, this.zones.owner)]);
                    } else {

                        let card: Card = this.zones.deck.pop();

                        // addCard to hand if not full
                        if (!this.zones.hand.isFull) {
                            this.zones.hand.addEntity(card);

                            // dispatch event if drawn
                            resolve([new jsLogic.DispatchEvent(new CardDrawnEvent(this, this.zones.owner, card))]);
                        } else {
                            // mill card if hand is full
                            resolve([new MillCard(this.source, card, this.zones.graveyard)]);
                        }
                    }
                });
        }

        constructor(source: jsLogic.IAction<HsActionParam>, public zones: HsZones) {
            super(source);
        };
    }
}