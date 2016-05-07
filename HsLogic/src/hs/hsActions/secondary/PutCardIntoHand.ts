/// <reference path="../../core/action.ts" />

"use strict";

namespace HsLogic {

    export interface PutCardIntoOwnersHandParam extends IActionParam {
        card: Card
    }

    /**
     * PutCardIntoHand
 	 *
 	 */
    export class PutCardIntoOwnersHand<P extends PutCardIntoOwnersHandParam> extends Action<P> {

        resolve( self: PutCardIntoOwnersHand<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<ActionType | ActionType[]>(

                ( resolve, reject ): void => {
                    let param: P = self.param,
                        zones: Zones = gameCtx.gameBoard.zonesOf( param.card.owner );

                    if ( !isHandFull( zones.hand, gameCtx ) )
                        zones.hand.add( param.card );

                    resolve( jsAction.NO_CONSEQUENCES );
                });
        }
    }
}