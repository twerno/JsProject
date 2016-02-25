///<reference path="../core/HsAction.ts"/>
///<reference path="../core/HsActionEvent.ts"/> 


"use strict";

namespace HSLogic {



    /**
     * Sequence
     *
 	 */
    export class DeathCreationStep extends jsLogic.IAction<HsActionParam> {

        resolve(_this_: DeathCreationStep, param: HsActionParam): PromiseOfActions {
            return new Promise<HsAction[]>(
                (resolve, reject): void => {
                    resolve(null);
                });
        }
    }
}