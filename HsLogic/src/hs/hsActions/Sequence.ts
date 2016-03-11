///<reference path="../core/HsAction.ts"/>

"use strict";

namespace HSLogic {


    /**
     * Sequence
     *
 	 */
    export class Sequence extends jsLogic.IAction<HsGameCtx> {

        resolve(_this_: Sequence, gameCtx: HsGameCtx): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                (resolve, reject): void => {

                    let actions: jsLogic.IAction<HsGameCtx>[] = [];

                    while (_this_.innerActions && _this_.innerActions.length > 0)
                        actions.push(_this_.innerActions.shift());

                    //actions.push(gameCtx.actionFactory.auraUpdateStep(_this_.source));
                    actions.push(gameCtx.actionFactory.deathCreationStep({ source: _this_.hsSource }));

                    resolve(actions);
                });
        }

        constructor(public hsSource: IHsSource, public innerActions: jsLogic.IAction<HsGameCtx>[]) {
            super(hsSource.action);
        }

    }
}