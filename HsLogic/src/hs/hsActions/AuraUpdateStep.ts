///<reference path="../core/HsAction.ts"/>
///<reference path="../core/HsActionEvent.ts"/> 


"use strict";

namespace HSLogic {



    /**
     * AuraUpdateStep
     *
 	 */
    export class AuraUpdateStep extends jsLogic.IAction<HsGameEnv> {

        resolve(_this_: AuraUpdateStep, gameEnv: HsGameEnv): PromiseOfActions {
            return new Promise<HsAction[]>(
                (resolve, reject): void => {
                    resolve(null);
                });
        }
    }
}