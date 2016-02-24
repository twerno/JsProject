"use strict";

namespace HSLogic {

    /**
     * ShuffleDeck
	 *
 	 */
    export class ShuffleDeck extends HsBaseAction {

        protected baseActionResolver(_this_: ShuffleDeck, param: HsActionParam): void {
            //super.baseActionResolver(param);
            MathUtils.randomizeArray(_this_.zone.getRawArray());
        }

        constructor(source: jsLogic.IAction<HsActionParam>, public zone: HsZone) {
            super(source);
        };
    }
}