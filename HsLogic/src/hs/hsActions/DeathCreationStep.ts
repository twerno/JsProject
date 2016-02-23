///<reference path="../HsAction.ts"/>
///<reference path="../HsActionEvent.ts"/> 
///<reference path="../../core/action/eventAction/CancellableAction.ts"/>

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
                    for (let i = 0; i < 1e8; i++) {
                        () => { new Object };
                    }
                    reject(null);
                });
        }
    }
}