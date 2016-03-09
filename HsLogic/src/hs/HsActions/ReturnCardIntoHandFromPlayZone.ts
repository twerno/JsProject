///<reference path="../core/HsAction.ts"/>

"use strict";

namespace HSLogic {

    export interface ReturnCardIntoOwnersHandParam extends HsActionParam {
        sourceZone: HsZone,
        card: Card
    }

    /**
     * ReturnCardIntoHandFromPlayZone
     *
	 * Put non generated card into hand.
	 * If the hand is full DESTROY IT (deathrattle etc)
 	 *
 	 */
    export class ReturnCardIntoOwnersHandFrom<P extends ReturnCardIntoOwnersHandParam> extends HsAction<P> {

        resolve(_this_: ReturnCardIntoOwnersHandFrom<P>, gameCtx: HsGameCtx): PromiseOfActions {
            return new Promise<HsAction<P>[]>(
                (resolve, reject): void => {
                    let param: P = _this_.param,
                        hand: HsZone = gameCtx.zonesOf(param.card.owner).hand;

                    if (hand.isFull) {
                        resolve([gameCtx.actionFactory.markAsDestroyed(param.source, param.card)]);
                    }
                    else {
                        param.sourceZone.removeEntity(param.card);
                        hand.addEntity(param.card);
                        resolve(null);
                    }
                });
        }

        //constructor(source: jsLogic.IAction<HsGameCtx>, public sourceZone: HsZone, public card: Card) {
        //    super(source);
        //};
    }
}