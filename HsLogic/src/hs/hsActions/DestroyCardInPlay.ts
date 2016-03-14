///<reference path="../core/HsAction.ts"/>


"use strict";

namespace HsLogic {


    /**
     * DestroyCardInPlay
     *
 	 */
    export class DestroyCardInPlay<P extends CardParam> extends HsAction<P> {

        resolve( _this_: DestroyCardInPlay<P>, param: HsGameCtx ): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = _this_.param;

                    resolve( null );
                });
        }
    }
}