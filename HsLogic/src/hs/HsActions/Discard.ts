///<reference path="../core/HsAction.ts"/>
///<reference path="../core/HsActionEvent.ts"/>


"use strict";

namespace HSLogic {


    export interface DiscardParam extends HsEventParam {
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

        resolve(_this_: Discard, param: HsActionParam): PromiseOfActions {

            return new Promise<HsAction[]>(
                (resolve, reject): void => {

                    if (!_this_.discardParam || !_this_.discardParam.card) {
                        reject(new Error(`No card to discard!`));
                        return;
                    }

                    param.zones.hand.removeEntity(_this_.discardParam.card);
                    param.zones.graveyard.addEntity(_this_.discardParam.card);

                    resolve([
                        param.actionBuilder.dispatch(new OnAfterDiscardEvent(_this_.discardParam))
                    ]);
                });
        }

        constructor(public discardParam: DiscardParam) {
            super(discardParam.sourceAction);
        };
    }
}