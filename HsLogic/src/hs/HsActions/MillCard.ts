///<reference path="../HsAction.ts"/>

"use strict";

namespace HSLogic {
	
    /**
     * MillCard
     *
 	 */
    export class MillCard extends HsBaseAction {

        protected baseActionResolver(_this_: MillCard, param: HsActionParam): void {
            _this_.graveyard.addEntity(_this_.card);
        }

        constructor(source: jsLogic.IAction<HsActionParam>, public card: Card, public graveyard: HsZone) {
            super(source);
        };
    }
}