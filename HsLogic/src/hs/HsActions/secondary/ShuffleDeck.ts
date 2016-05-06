/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {

    /**
     * ShuffleDeck
	 *
 	 */
    export class ShuffleDeck<P extends TargetPlayerParam> extends Action<P> {

        resolve( self: ShuffleDeck<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<ActionType | ActionType[]>(

                ( resolve, reject ): void => {
                    let param: P = self.param,
                        deck: Zone<Card> = gameCtx.gameBoard.zonesOf( param.player ).deck;

                    MathUtils.randomizeArray( deck.entities );
                });
        }
    }
}