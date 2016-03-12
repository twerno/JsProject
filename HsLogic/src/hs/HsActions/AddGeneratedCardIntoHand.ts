///<reference path="../core/HsAction.ts"/>

"use strict";

namespace HSLogic {

    /**
     * AddGeneratedCardIntoHand
     *
     * #RULE:(Rule Z0) - nothing happens if the hand is full
     *
 	 * http://hearthstone.gamepedia.com/Generate
 	 * http://hearthstone.gamepedia.com/Advanced_rulebook 
 	 *
 	 */
    export class AddGeneratedCardIntoHand<P extends PlayerAndCardParam> extends HsAction<P> {

        resolve( _this_: AddGeneratedCardIntoHand<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(

                ( resolve, reject ): void => {
                    let param: P = _this_.param,
                        hand: HsZone = gameCtx.zonesOf( param.player ).hand;

                    if ( !hand.isFull )
                        hand.addEntity( param.card );
                });
        }
    }
}