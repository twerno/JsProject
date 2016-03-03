///<reference path="../core/HsAction.ts"/>
///<reference path="../core/HsActionEvent.ts"/>

"use strict";

namespace HSLogic {


    export interface DrawParam extends HsEventParam {
        target: Player
    }

    export interface AfterDrawParam extends DrawParam {
        card: Card
    }

    export class OnAfterDrawEvent extends HsActionEvent<AfterDrawParam> {

        static get type(): string { return OnAfterDrawEvent.name }
    }

    /**
     * DrawCard
     *
 	 */
    export class DrawCard extends HsAction {

        resolve(_this_: DrawCard, gameEnv: HsGameEnv): PromiseOfActions {

            return new Promise<HsAction[]>(
                (resolve, reject): void => {

                    let targetPlayer: Player = _this_.drawParam.target;
                    let zones: HsZones = gameEnv.zonesOf(targetPlayer);

                    // fatigue
                    if (zones.deck.isEmpty()) {
                        resolve([gameEnv.actionFactory.fatigue(_this_.source, targetPlayer)]);
                    } else {

                        let card: Card = zones.deck.pop();;

                        // addCard to hand if not full
                        if (!zones.hand.isFull()) {
                            zones.hand.addEntity(card);

                            // dispatch event if drawn
                            resolve([
                                gameEnv.actionFactory.dispatch(
                                    new OnAfterDrawEvent({
                                        target: targetPlayer,
                                        card: card,
                                        sourceAction: _this_.drawParam.sourceAction
                                    }))
                            ]);
                        } else {
                            // mill card if hand is full
                            resolve([gameEnv.actionFactory.millCard(_this_.source, card, zones.graveyard)]);
                        }
                    }
                });

        }

        constructor(public drawParam: DrawParam) {
            super(drawParam.sourceAction);
        };
    }
}