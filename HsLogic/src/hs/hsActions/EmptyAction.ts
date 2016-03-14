///<reference path="../core/HsAction.ts"/>

"use strict";

namespace HSLogic {

    export interface EmptyActionParam extends IHsActionParam {
        message: string
    }

    /**
     * MillCard
     *
 	 */
    export class EmptyAction<P extends EmptyActionParam> extends HsAction<P> {

        resolve( _this_: EmptyAction<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = _this_.param;

                    console.log( `Empty action resolver: ${param.message}` );
                });
        }
    }
}