"use strict";

namespace HSLogic {

    /**
     * ShuffleDeck
	 *
 	 */
    export class ShuffleDeck<P extends TargetPlayerParam> extends HsAction<P> {

        resolve( _this_: ShuffleDeck<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(

                ( resolve, reject ): void => {
                    let param: P = _this_.param,
                        deck: HsZone = gameCtx.zonesOf( param.target ).deck;

                    MathUtils.randomizeArray( deck.getRawArray() );
                });
        }
    }
}