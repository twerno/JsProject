///<reference path="../core/HsAction.ts"/>

"use strict";

namespace HsLogic {

    /**
     * AddGeneratedCardIntoHand
     *
     * #RULE:(Rule Z0) - nothing happens if the hand is full
     *
 	 * http://hearthstone.gamepedia.com/Generate
 	 * http://hearthstone.gamepedia.com/Advanced_rulebook 
 	 *
 	 */
    export class AddGeneratedCardIntoHand<P extends PlayerAndCardParam> extends Action<P> {

        resolve( self: AddGeneratedCardIntoHand<P>, context: HsGameCtx ): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(

                ( resolve, reject ): void => {
                    let param: P = self.param,
                        hand: HsZone<Card> = context.zonesOf( param.player ).hand;

                    if ( !hand.isFull )
                        hand.addEntity( param.card );
                });
        }
    }
}