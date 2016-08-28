/// <reference path="../../core/action.ts" />

"use strict";

namespace HsLogic {

    // /**
    //  * AddGeneratedCardIntoHand
    //  *
    //  * #RULE:(Rule Z0) - nothing happens if the hand is full
    //  *
    //* http://hearthstone.gamepedia.com/Generate
    //* http://hearthstone.gamepedia.com/Advanced_rulebook 
    //*
    //*/
    // export class AddGeneratedCardIntoHand<P extends PlayerAndCardParam> extends Action<P> {

    //     resolve( self: AddGeneratedCardIntoHand<P>, gameCtx: HsGameCtx ): PromiseOfActions {
    //         return new Promise<ActionType | ActionType[]>(

    //             ( resolve, reject ): void => {
    //                 let param: P = self.param,
    //                     hand: Zone<Card> = gameCtx.gameBoard.zonesOf( param.player ).hand;

    //                 if ( !hand.isFull )
    //                     hand.add( param.card );
    //             });
    //     }
    // }
}