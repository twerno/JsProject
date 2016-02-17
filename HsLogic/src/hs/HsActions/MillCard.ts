///<reference path="../HsAction.ts"/>

"use strict";

namespace HSLogic {
	
    /**
     * MillCard
     *
 	 */
    export class MillCard extends HsBaseAction {

        protected baseActionResolver(param: HsActionParam): void {
            this.graveyard.addEntity(this.card);
        }

        constructor(source: jsLogic.IAction<HsActionParam>, public card: Card, public graveyard: HsZone) {
            super(source);
        };
    }
}