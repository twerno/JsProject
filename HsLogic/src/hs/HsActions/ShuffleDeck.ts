"use strict";

namespace HsLogic {

    /**
     * ShuffleDeck
	 *
 	 */
    export class ShuffleDeck<P extends TargetPlayerParam> extends HsAction<P> {

        resolve( _this_: ShuffleDeck<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(

                ( resolve, reject ): void => {
                    let param: P = _this_.param,
                        deck: HsZone<Card> = gameCtx.zonesOf( param.player ).deck;

                    MathUtils.randomizeArray( deck.getRawArray() );
                });
        }
    }
}