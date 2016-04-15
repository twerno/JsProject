/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {


    /**
     * MillCard
     *
 	 */
    export class MillCard<P extends CardParam> extends Action<P> {

        resolve( self: MillCard<P>, context: HsGameCtx ): PromiseOfActions {
            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        graveyard: HsZone<Card> = context.zonesOf( param.card.owner ).graveyard;

                    graveyard.addEntity( param.card );
                });
        }
    }
}