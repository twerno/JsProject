/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {


    // /**
    //  * MillCard
    //  *
    //*/
    // export class MillCard<P extends CardParam> extends Action<P> {

    //     resolve( self: MillCard<P>, gameCtx: HsGameCtx ): PromiseOfActions {
    //         return new Promise<ActionType | ActionType[]>(
    //             ( resolve, reject ): void => {
    //                 let param: P = self.param,
    //                     graveyard: Zone<Card> = gameCtx.gameBoard.zonesOf( param.card.owner ).graveyard;

    //                 graveyard.add( param.card );
    //             });
    //     }
    // }
}