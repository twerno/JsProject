///<reference path="../core/HsAction.ts"/>

"use strict";

namespace HSLogic {

    /**
     * MillCard
     *
 	 */
    export class MillCard extends HsBaseAction {

        protected baseActionResolver(_this_: MillCard, gameEnv: HsGameEnv): void {
            let graveyard: HsZone = gameEnv.zonesOf(_this_.card.owner).graveyard;

            graveyard.addEntity(_this_.card);
        }

        constructor(source: jsLogic.IAction<HsGameEnv>, public card: Card) {
            super(source);
        };
    }
}