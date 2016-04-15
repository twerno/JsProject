/// <reference path="../core/action.ts" />
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

        resolve( self: EmptyAction<P>, context: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param;

                    console.log( `Empty action resolver: ${param.message}` );
                });
        }
    }
}