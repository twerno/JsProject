///<reference path="../core/HsAction.ts"/>
///<reference path="../core/HsActionEvent.ts"/> 
///<reference path="../../core/action/helperActions/CancellableAction.ts"/>

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

                    actions.push(param.actionBuilder.auraUpdateStep(_this_.source));
                    actions.push(param.actionBuilder.deathCreationStep(_this_.source));

                    resolve(actions);
                });
        }

        constructor(source: jsLogic.IAction<HsActionParam>, public innerActions: jsLogic.IAction<HsActionParam>[]) {
            super(source);
        };

    }
}