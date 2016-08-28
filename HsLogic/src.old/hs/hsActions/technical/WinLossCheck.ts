/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {

    export class WinLossCheck<P extends IActionParam> extends Action<P> {

        resolve( self: WinLossCheck<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [];

                    resolve( actions );
                }
            );
        }
    }

}