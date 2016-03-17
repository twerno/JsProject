///<reference path="../core/HsAction.ts"/>


"use strict";

namespace HsLogic {


    export class OnAfterDiscardEvent<P extends PlayerAndCardParam> extends ActionEvent<P> {
        static get type(): string { return OnAfterDiscardEvent.name }
    }


    /**
     * Discard
     *
 	 */
    export class Discard<P extends PlayerAndCardParam> extends Action<P> {

        resolve( self: Discard<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        zones: HsZones = gameCtx.zonesOf( param.player );

                    if ( !param || !param.card ) {
                        reject( new Error( `No card to discard!` ) );
                        return;
                    }

                    zones.hand.removeEntity( param.card );
                    zones.graveyard.addEntity( param.card );

                    resolve( [
                        //gameCtx.actionFactory.dispatch<HsGameCtx, P>( new OnAfterDiscardEvent<P>( param ) )
                    ] );
                });
        }
    }
}