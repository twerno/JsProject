///<reference path="../core/HsAction.ts"/>

"use strict";

namespace HSLogic {

    /**
     * MillCard
     *
 	 */
    export class EmptyAction extends HsBaseAction {

        protected baseActionResolver(_this_: MillCard, gameCtx: HsGameCtx): void {
            //console.log(`Empty action resolver: ${this.message}`);
        }

        constructor(source: jsLogic.IAction<HsGameCtx>, public message: string) {
            super(source);
        };
    }
}