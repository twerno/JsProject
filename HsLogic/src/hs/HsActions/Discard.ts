///<reference path="../core/HsAction.ts"/>

"use strict";

namespace HSLogic {


    export class OnAfterDiscardEvent extends HsActionEvent {

        static get type(): string { return OnAfterDiscardEvent.name }

        constructor(source: jsLogic.IAction<HsActionParam>, public card: Card) {
            super(source);
        }
    }

    /**
     * DiscardCard
     *
 	 */
    export class Discard extends HsAction {

        resolve(_this_: Discard, param: HsActionParam): PromiseOfActions {

            return new Promise<HsAction[]>(
                (resolve, reject): void => {

                    if (!_this_.card) {
                        resolve([]);
                        return;
                    }

                    let actions: jsLogic.IAction<HsActionParam>[] = [];
                    let event: OnAfterDiscardEvent = new OnAfterDiscardEvent(_this_.source, _this_.card);

                    _this_.zones.hand.removeEntity(_this_.card);
                    actions.push(param.actionBuilder.dispatchEvent(event));
                    //                    actions.push(new jsLogic.AddEntityToZone(_this_.source, _this_.card, _this_.zones.graveyard));

                    resolve(actions);
                });
        }

        constructor(source: jsLogic.IAction<HsActionParam>, public card: Card, public zones: HsZones) {
            super(source);
        };
    }
}