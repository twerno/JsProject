///<reference path="../core/HsAction.ts"/>

"use strict";

namespace HSLogic {

    /**
     * MillCard
     *
 	 */
    export class MillCard extends HsBaseAction {

        protected baseActionResolver(_this_: MillCard, gameCtx: HsGameCtx): void {
            let graveyard: HsZone = gameCtx.zonesOf(_this_.card.owner).graveyard;

            graveyard.addEntity(_this_.card);
        }

        constructor(source: jsLogic.IAction<HsGameCtx>, public card: Card) {
            super(source);
        };
    }
}