///<reference path="../core/HsAction.ts"/>
///<reference path="../core/HsActionEvent.ts"/>


"use strict";

namespace HSLogic {


    export interface DiscardParam extends HsActionParam {
        target: Player,
        card: Card;
    }


    export class OnAfterDiscardEvent extends HsActionEvent<DiscardParam> {

        static get type(): string { return OnAfterDiscardEvent.name }
    }


    /**
     * Discard
     *
 	 */
    export class Discard extends HsAction {

        resolve(_this_: Discard, gameCtx: HsGameCtx): PromiseOfActions {

            return new Promise<HsAction[]>(
                (resolve, reject): void => {

                    let zones: HsZones = gameCtx.zonesOf(_this_.discardParam.target);

                    if (!_this_.discardParam || !_this_.discardParam.card) {
                        reject(new Error(`No card to discard!`));
                        return;
                    }

                    zones.hand.removeEntity(_this_.discardParam.card);
                    zones.graveyard.addEntity(_this_.discardParam.card);

                    resolve([
                        gameCtx.actionFactory.dispatch(new OnAfterDiscardEvent(_this_.discardParam))
                    ]);
                });
        }

        constructor(public discardParam: DiscardParam) {
            super(discardParam.sourceAction);
        };
    }
}