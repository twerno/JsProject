///<reference path="../HsAction.ts"/>

"use strict";

namespace HSLogic {
	
    /**
     * MillCard
     *
 	 */
    export class MarkAsDestroyed extends HsBaseAction {

        protected baseActionResolver(param: HsActionParam): void {
            this.card.markers.put(new DestroyMarker());
        }

        constructor(source: jsLogic.IAction<HsActionParam>, public card: Card) {
            super(source);
        };
    }
}