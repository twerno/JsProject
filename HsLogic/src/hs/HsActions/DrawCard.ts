///<reference path="../core/HsAction.ts"/>
///<reference path="../core/HsActionEvent.ts"/>

"use strict";

namespace HSLogic {


    export interface DrawParam extends HsEventParam {
        target: DrawTarget,
        card: Card
    }

    export class OnAfterDrawEvent extends HsActionEvent<DrawParam> {

        static get type(): string { return OnAfterDrawEvent.name }
    }

    /**
     * DrawCard
     *
 	 */
    export class DrawCard extends HsAction {

        resolve(_this_: DrawCard, param: HsActionParam): PromiseOfActions {

            return new Promise<HsAction[]>(
                (resolve, reject): void => {

                    let target: DrawTarget = _this_.drawParam.target;

                    // fatigue
                    if (target.zones.deck.isEmpty()) {
                        resolve([param.actionBuilder.fatigue(_this_.source, target.player)]);
                    } else {

                        let card: Card = _this_.drawParam.target.zones.deck.pop();

                        // addCard to hand if not full
                        if (!target.zones.hand.isFull()) {
                            target.zones.hand.addEntity(card);

                            // dispatch event if drawn
                            resolve([
                                param.actionBuilder.dispatch(
                                    new OnAfterDrawEvent(_this_.drawParam))
                            ]);
                        } else {
                            // mill card if hand is full
                            resolve([param.actionBuilder.millCard(_this_.source, card, target.zones.graveyard)]);
                        }
                    }
                });

        }

        constructor(public drawParam: DrawParam) {
            super(drawParam.sourceAction);
        };
    }
}