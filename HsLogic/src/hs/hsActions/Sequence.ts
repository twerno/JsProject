///<reference path="../core/HsAction.ts"/>
///<reference path="../core/HsActionEvent.ts"/> 

"use strict";

namespace HSLogic {



    /**
     * Sequence
     *
 	 */
    export class Sequence extends jsLogic.IAction<HsGameEnv> {

        resolve(_this_: Sequence, gameEnv: HsGameEnv): PromiseOfActions {
            return new Promise<HsAction[]>(
                (resolve, reject): void => {
                    let actions: jsLogic.IAction<HsGameEnv>[] = [];

                    while (_this_.innerActions && _this_.innerActions.length > 0)
                        actions.push(_this_.innerActions.shift());

                    actions.push(gameEnv.actionFactory.auraUpdateStep(_this_.source));
                    actions.push(gameEnv.actionFactory.deathCreationStep(_this_.source));

                    resolve(actions);
                });
        }

        constructor(source: jsLogic.IAction<HsGameEnv>, public innerActions: jsLogic.IAction<HsGameEnv>[]) {
            super(source);
        };

    }
}