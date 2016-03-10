///<reference path="../core/HsAction.ts"/>


"use strict";

namespace HSLogic {


    export class OnAfterDiscardEvent<P extends PlayerAndCardParam> extends HsActionEvent<P> {
        static get type(): string { return OnAfterDiscardEvent.name }
    }


    /**
     * Discard
     *
 	 */
    export class Discard<P extends PlayerAndCardParam> extends HsAction<P> {

        resolve(_this_: Discard<P>, gameCtx: HsGameCtx): PromiseOfActions {

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                (resolve, reject): void => {
                    let param: P = _this_.param,
                        zones: HsZones = gameCtx.zonesOf(param.player);

                    if (!param || !param.card) {
                        reject(new Error(`No card to discard!`));
                        return;
                    }

                    zones.hand.removeEntity(param.card);
                    zones.graveyard.addEntity(param.card);

                    resolve([
                        gameCtx.actionFactory.dispatch<HsGameCtx, P>(new OnAfterDiscardEvent<P>(param))
                    ]);
                });
        }
    }
}