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

                    actions.push(_this_.innerAction);
                    actions.push(new AuraUpdateStep(_this_));
                    actions.push(new DeathCreationStep(_this_));

                    resolve(actions);
                });
        }

        constructor(source: jsLogic.IAction<HsActionParam>, public innerAction: jsLogic.IAction<HsActionParam>) {
            super(source);
        };

    }
}