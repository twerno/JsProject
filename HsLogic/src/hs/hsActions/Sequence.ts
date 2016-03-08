///<reference path="../core/HsAction.ts"/>
///<reference path="../core/HsActionEvent.ts"/> 

"use strict";

namespace HSLogic {



    /**
     * Sequence
     *
 	 */
    export class Sequence extends jsLogic.IAction<HsGameCtx> {

        resolve(_this_: Sequence, gameCtx: HsGameCtx): PromiseOfActions {
            return new Promise<HsAction[]>(
                (resolve, reject): void => {
                    let actions: jsLogic.IAction<HsGameCtx>[] = [];

                    while (_this_.innerActions && _this_.innerActions.length > 0)
                        actions.push(_this_.innerActions.shift());

                    actions.push(gameCtx.actionFactory.auraUpdateStep(_this_.source));
                    actions.push(gameCtx.actionFactory.deathCreationStep(_this_.source));

                    resolve(actions);
                });
        }

        constructor(source: jsLogic.IAction<HsGameCtx>, public innerActions: jsLogic.IAction<HsGameCtx>[]) {
            super(source);
        }

    }
}