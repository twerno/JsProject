///<reference path="../HsAction.ts"/>
///<reference path="../HsActionEvent.ts"/> 
///<reference path="../../core/action/eventAction/CancellableAction.ts"/>

"use strict";

namespace HSLogic {



    /**
     * Sequence
     *
 	 */
    export class Sequence extends jsLogic.IAction<HsActionParam> {

        resolve(_this_: Sequence, param: HsActionParam): PromiseOfActions {
            return new Promise<HsAction[]>(
                (resolve, reject): void => {
                    let actions: jsLogic.IAction<HsActionParam>[] = [];

                    while (_this_.innerActions && _this_.innerActions.length > 0)
                        actions.push(_this_.innerActions.shift());

                    actions.push(new AuraUpdateStep(_this_.source));
                    actions.push(new DeathCreationStep(_this_.source));

                    resolve(actions);
                });
        }

        constructor(source: jsLogic.IAction<HsActionParam>, public innerActions: jsLogic.IAction<HsActionParam>[]) {
            super(source);
        };

    }
}