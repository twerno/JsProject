///<reference path="../core/HsAction.ts"/>

"use strict";

namespace HsLogic {



    /**
     * AddGeneratedCardIntoHand
     *
	 * Put non generated card into hand.
	 * If the hand is full move it to graveyard instead
 	 *
 	 */
    export class PutCardIntoHand<P extends PlayerAndCardParam> extends Action<P> {

        resolve( self: PutCardIntoHand<P>, context: HsGameCtx ): PromiseOfActions {
            return new Promise<ActionType | ActionType[]>(

                ( resolve, reject ): void => {
                    let param: P = self.param,
                        zones: HsZones = context.zonesOf( param.player );

                    if ( !zones.hand.isFull ) {
                        zones.hand.addEntity( param.card );
                        resolve( null );
                    } else {
                        resolve( [context.actionFactory.millCard( param.source, param.card )] );
                    }
                });
        }
    }
}