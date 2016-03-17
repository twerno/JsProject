///<reference path="../core/HsAction.ts"/>


"use strict";

namespace HsLogic {


    /**
     * DestroyCardInPlay
     *
 	 */
    export class DestroyCardInPlay<P extends CardParam> extends Action<P> {

        resolve( self: DestroyCardInPlay<P>, param: HsGameCtx ): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param;

                    resolve( null );
                });
        }
    }
}