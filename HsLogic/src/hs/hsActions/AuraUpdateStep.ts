///<reference path="../core/HsAction.ts"/>
///<reference path="../core/HsActionEvent.ts"/> 
///<reference path="../../core/action/helperActions/CancellableAction.ts"/>

"use strict";

namespace HSLogic {



    /**
     * AuraUpdateStep
     *
 	 */
    export class AuraUpdateStep extends jsLogic.IAction<HsActionParam> {

        resolve(_this_: AuraUpdateStep, param: HsActionParam): PromiseOfActions {
            return new Promise<HsAction[]>(
                (resolve, reject): void => {
                    resolve(null);
                });
        }
    }
}