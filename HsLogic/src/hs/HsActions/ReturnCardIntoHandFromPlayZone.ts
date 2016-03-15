///<reference path="../core/HsAction.ts"/>

"use strict";

namespace HsLogic {

    export interface ReturnCardIntoOwnersHandParam extends IHsActionParam {
        sourceZone: HsZone<Card>,
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

        resolve( _this_: ReturnCardIntoOwnersHandFrom<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = _this_.param,
                        hand: HsZone<Card> = gameCtx.zonesOf( param.card.owner ).hand;

                    if ( hand.isFull ) {
                        //resolve([gameCtx.actionFactory.markAsDestroyed(param.source, param.card)]);
                    }
                    else {
                        param.sourceZone.removeEntity( param.card );
                        hand.addEntity( param.card );
                        resolve( null );
                    }
                });
        }
    }
}