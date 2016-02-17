///<reference path="../HsAction.ts"/>

"use strict";

namespace HSLogic {

    export class CardDrawnEvent extends HsActionEvent {

        constructor(source: jsLogic.IAction<HsActionParam>, public target: DrawTarget, public card: Card) {
            super(source);
        };

    }

    /**
     * DrawCard
     *
 	 */
    export class DrawCard extends HsAction {

        resolve(param: HsActionParam): PromiseOfActions {
            let self: DrawCard = this;

            return new Promise<HsAction[]>(
                (resolve: any, reject: any): void => {

                    // fatigue
                    if (self.target.zones.deck.isEmpty()) {
                        resolve([new Fatigue(self.source, self.target.player)]);
                    } else {

                        let card: Card = self.target.zones.deck.pop();

                        // addCard to hand if not full
                        if (!self.target.zones.hand.isFull) {
                            self.target.zones.hand.addEntity(card);

                            // dispatch event if drawn
                            let event: CardDrawnEvent = new CardDrawnEvent(self, self.target, card);
                            resolve([new jsLogic.DispatchEventAction(event)]);
                        } else {
                            // mill card if hand is full
                            resolve([new MillCard(self.source, card, self.target.zones.graveyard)]);
                        }
                    }
                });

        }

        constructor(source: jsLogic.IAction<HsActionParam>, public target: DrawTarget) {
            super(source);
        };
    }
}