/// <reference path="../../core/action.ts" />
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

        resolve( self: Discard<P>, context: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        zones: HsZones = context.zonesOf( param.player );

                    if ( !param || !param.card ) {
                        reject( new Error( `No card to discard!` ) );
                        return;
                    }

                    zones.hand.removeEntity( param.card );
                    zones.graveyard.addEntity( param.card );

                    resolve( [
                        //context.actionFactory.dispatch<HsGameCtx, P>( new OnAfterDiscardEvent<P>( param ) )
                    ] );
                });
        }
    }
}