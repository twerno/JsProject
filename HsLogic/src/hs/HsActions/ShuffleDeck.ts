///<reference path="../../core/action/ZoneAction/RandomizeZone.ts"/>

"use strict";

namespace HSLogic {
	
    /**
     * ShuffleDeck
	 *
 	 */
    export class ShuffleDeck extends jsLogic.RandomizeZone<HsActionParam> {

        constructor(source: jsLogic.IAction<HsActionParam>, public deck: jsLogic.Zone<jsLogic.Entity>) {
            super(source, deck);
        };
    }
}