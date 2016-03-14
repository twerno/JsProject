///<reference path="../core/HsAction.ts"/>

"use strict";

namespace HsLogic {


    /**
     * MillCard
     *
 	 */
    export class MillCard<P extends CardParam> extends HsAction<P> {

        resolve( _this_: MillCard<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = _this_.param,
                        graveyard: HsZone = gameCtx.zonesOf( param.card.owner ).graveyard;

                    graveyard.addEntity( param.card );
                });
        }
    }
}