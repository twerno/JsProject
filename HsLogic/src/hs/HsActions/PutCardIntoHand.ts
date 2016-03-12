///<reference path="../core/HsAction.ts"/>

"use strict";

namespace HSLogic {



    /**
     * AddGeneratedCardIntoHand
     *
	 * Put non generated card into hand.
	 * If the hand is full move it to graveyard instead
 	 *
 	 */
    export class PutCardIntoHand<P extends PlayerAndCardParam> extends HsAction<P> {

        resolve( _this_: PutCardIntoHand<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(

                ( resolve, reject ): void => {
                    let param: P = _this_.param,
                        zones: HsZones = gameCtx.zonesOf( param.player );

                    if ( !zones.hand.isFull ) {
                        zones.hand.addEntity( param.card );
                        resolve( null );
                    } else {
                        resolve( [gameCtx.actionFactory.millCard( param.source, param.card )] );
                    }
                });
        }
    }
}