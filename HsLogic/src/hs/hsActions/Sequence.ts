///<reference path="../core/HsAction.ts"/>

"use strict";

namespace HsLogic {


    /**
     * Sequence
     *
 	 */
    export class Sequence extends jsLogic.IAction<HsGameCtx> {

        resolve( self: Sequence, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {

                    let actions: jsLogic.IAction<HsGameCtx>[] = [];

                    while ( self.innerActions && self.innerActions.length > 0 )
                        actions.push( self.innerActions.shift() );

                    //actions.push(gameCtx.actionFactory.auraUpdateStep(self.source));
                    actions.push( gameCtx.actionFactory.deathCreationStep( { source: self.source }) );

                    resolve( actions );
                });
        }

        constructor( public source: ISource, public innerActions: jsLogic.IAction<HsGameCtx>[] ) {
            super( source );
        }

    }
}