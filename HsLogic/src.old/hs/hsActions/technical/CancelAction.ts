/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {


    export class CancelAction<P extends IHsCancelableParam> extends Action<P> {

        resolve( self: CancelAction<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param;

                    param.cancelAction.value = true;
                    resolve( jsAction.NO_CONSEQUENCES );
                }
            );
        }
    }

}