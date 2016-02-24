///<reference path="../core/HsAction.ts"/>

"use strict";

namespace HSLogic {

    /**
     * MillCard
     *
 	 */
    export class MarkAsDestroyed extends HsBaseAction {

        protected baseActionResolver(_this_: MarkAsDestroyed, param: HsActionParam): void {
            _this_.card.markers.put(new DestroyMarker());
        }

        constructor(source: jsLogic.IAction<HsActionParam>, public card: Card) {
            super(source);
        };
    }
}