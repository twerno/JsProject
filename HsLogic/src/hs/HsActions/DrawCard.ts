///<reference path="../core/HsAction.ts"/>

"use strict";

namespace HSLogic {


    export interface DrawParam extends HsActionParam {
        player: Player
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
    export class DrawCard<P extends DrawParam> extends HsAction<P> {

        resolve(_this_: DrawCard<P>, gameCtx: HsGameCtx): PromiseOfActions {

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                (resolve, reject): void => {
                    let param: P = _this_.param,
                        zones: HsZones = gameCtx.zonesOf(param.player);

                    // fatigue
                    if (zones.deck.isEmpty()) {
                        resolve([gameCtx.actionFactory.fatigue(param)]);

                    } else {

                        let card: Card = zones.deck.pop();

                        // addCard to hand if not full
                        if (!zones.hand.isFull()) {
                            zones.hand.addEntity(card);

                            // dispatch event if drawn
                            resolve([
                                gameCtx.actionFactory.dispatch(
                                    new OnAfterDrawEvent({
                                        player: param.player,
                                        card: card,
                                        sourceAction: param.sourceAction
                                    }))
                            ]);
                        } else {
                            // mill card if hand is full
                            resolve([gameCtx.actionFactory.millCard(_this_.source, card)]);
                        }
                    }
                });
        }
    }
}