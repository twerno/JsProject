"use strict";

namespace HSLogic {

    /**
     * ShuffleDeck
	 *
 	 */
    export class ShuffleDeck extends HsBaseAction {

        protected baseActionResolver(_this_: ShuffleDeck, gameEnv: HsGameEnv): void {
            //super.baseActionResolver(param);
            MathUtils.randomizeArray(_this_.zone.getRawArray());
        }

        constructor(source: jsLogic.IAction<HsGameEnv>, public zone: HsZone) {
            super(source);
        };
    }
}