///<reference path="../core/HsAction.ts"/>

"use strict";

namespace HsLogic {

    export interface EmptyActionParam extends IActionParam {
        message: string
    }

    /**
     * MillCard
     *
 	 */
    export class EmptyAction<P extends EmptyActionParam> extends Action<P> {

        resolve( self: EmptyAction<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param;

                    console.log( `Empty action resolver: ${param.message}` );
                });
        }
    }
}