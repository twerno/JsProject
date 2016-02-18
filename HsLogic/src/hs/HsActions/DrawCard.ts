///<reference path="../HsAction.ts"/>
///<reference path="../HsActionEvent.ts"/>

"use strict";

namespace HSLogic {

    export class OnAfterDrawCardEvent extends HsActionEvent {

        static get type(): string { return new OnAfterDrawCardEvent(null, null, null).type; }

        constructor(source: jsLogic.IAction<HsActionParam>, public target: DrawTarget, public card: Card) {
            super(source);
        };

    }

    /**
     * DrawCard
     *
 	 */
    export class DrawCard extends HsAction {

        resolve(_this_: DrawCard, param: HsActionParam): PromiseOfActions {

            return new Promise<HsAction[]>(
                (resolve, reject): void => {

                    // fatigue
                    if (_this_.target.zones.deck.isEmpty()) {
                        resolve([new Fatigue(_this_.source, _this_.target.player)]);
                    } else {

                        let card: Card = _this_.target.zones.deck.pop();

                        // addCard to hand if not full
                        if (!_this_.target.zones.hand.isFull()) {
                            _this_.target.zones.hand.addEntity(card);

                            // dispatch event if drawn
                            let event: HsActionEvent = new OnAfterDrawCardEvent(_this_, _this_.target, card);
                            resolve([new jsLogic.DispatchEventAction(event)]);
                        } else {
                            // mill card if hand is full
                            resolve([new MillCard(_this_.source, card, _this_.target.zones.graveyard)]);
                        }
                    }
                });

        }

        constructor(source: HsAction, public target: DrawTarget) {
            super(source);
        };
    }
}