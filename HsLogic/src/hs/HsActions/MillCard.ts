///<reference path="../core/HsAction.ts"/>

"use strict";

namespace HsLogic {


    /**
     * MillCard
     *
 	 */
    export class MillCard<P extends CardParam> extends Action<P> {

        resolve( self: MillCard<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        graveyard: HsZone<Card> = gameCtx.zonesOf( param.card.owner ).graveyard;

                    graveyard.addEntity( param.card );
                });
        }
    }
}