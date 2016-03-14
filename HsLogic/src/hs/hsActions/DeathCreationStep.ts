///<reference path="../core/HsAction.ts"/>


"use strict";

namespace HSLogic {



    /**
     * Sequence
     *
 	 */
    export class DeathCreationStep<P extends IHsActionParam> extends HsAction<P> {

        resolve( _this_: DeathCreationStep<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = _this_.param;

                    resolve( null );
                });
        }
    }
}