///<reference path="../core/HsAction.ts"/>


"use strict";

namespace HSLogic {


    /**
     * AuraUpdateStep
     *
 	 */
    export class AuraUpdateStep extends jsLogic.IAction<HsGameCtx> {

        resolve(_this_: AuraUpdateStep, gameCtx: HsGameCtx): PromiseOfActions {
            return new Promise<HsAction[]>(
                (resolve, reject): void => {
                    resolve(null);
                });
        }
    }
}