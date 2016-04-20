/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {

    export interface ReturnCardIntoOwnersHandParam extends IActionParam {
        sourceZone: Zone<Card>,
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

        resolve( self: ReturnCardIntoOwnersHandFrom<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        hand: Zone<Card> = gameCtx.gameBoard.zonesOf( param.card.owner ).hand;

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