/// <reference path="../../core/action.ts" />

"use strict";

namespace HsLogic {


    /**
     * DestroyCardInPlay
     *
 	 */
    export class DestroyCardInPlay<P extends CardParam> extends Action<P> {

        resolve( self: DestroyCardInPlay<P>, param: HsGameCtx ): PromiseOfActions {
            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param;

                    resolve( null );
                });
        }
    }
}