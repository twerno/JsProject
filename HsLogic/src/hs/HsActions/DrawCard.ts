///<reference path="../core/HsAction.ts"/>

"use strict";

namespace HSLogic {


    export interface DrawParam extends HsActionParam {
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
    export class DrawCard<P extends DrawParam> extends HsAction<P> {

        resolve(_this_: DrawCard<P>, gameCtx: HsGameCtx): PromiseOfActions {

            return new Promise<HsAction<P>[]>(
                (resolve, reject): void => {
                    let targetPlayer: Player = _this_.param.target;
                    let zones: HsZones = gameCtx.zonesOf(targetPlayer);

                    // fatigue
                    if (zones.deck.isEmpty()) {
                        resolve([gameCtx.actionFactory.fatigue(
                            {
                                sourceAction: _this_.source,
                                target: targetPlayer

                            })]);
                    } else {

                        let card: Card = zones.deck.pop();;

                        // addCard to hand if not full
                        if (!zones.hand.isFull()) {
                            zones.hand.addEntity(card);

                            // dispatch event if drawn
                            //resolve([
                            //    gameCtx.actionFactory.dispatch(
                            //        new OnAfterDrawEvent({
                            //            target: targetPlayer,
                            //            card: card,
                            //            sourceAction: _this_.drawParam.sourceAction
                            //        }))
                            //]);
                        } else {
                            // mill card if hand is full
                            //resolve([gameCtx.actionFactory.millCard(_this_.source, card)]);
                        }
                    }
                });
        }
    }
}