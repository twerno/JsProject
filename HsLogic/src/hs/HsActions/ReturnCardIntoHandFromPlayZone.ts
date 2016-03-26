///<reference path="../core/HsAction.ts"/>

"use strict";

namespace HsLogic {

    export interface ReturnCardIntoOwnersHandParam extends IActionParam {
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
    export class ReturnCardIntoOwnersHandFrom<P extends ReturnCardIntoOwnersHandParam> extends Action<P> {

        resolve( self: ReturnCardIntoOwnersHandFrom<P>, context: HsGameCtx ): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        hand: HsZone<Card> = context.zonesOf( param.card.owner ).hand;

                    if ( hand.isFull ) {
                        //resolve([context.actionFactory.markAsDestroyed(param.source, param.card)]);
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