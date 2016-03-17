"use strict";

namespace HsLogic {

    /**
     * ShuffleDeck
	 *
 	 */
    export class ShuffleDeck<P extends TargetPlayerParam> extends Action<P> {

        resolve( self: ShuffleDeck<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(

                ( resolve, reject ): void => {
                    let param: P = self.param,
                        deck: HsZone<Card> = gameCtx.zonesOf( param.player ).deck;

                    MathUtils.randomizeArray( deck.getRawArray() );
                });
        }
    }
}