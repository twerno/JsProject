///<reference path="../core/HsAction.ts"/>
///<reference path="../core/HsActionEvent.ts"/> 


"use strict";

namespace HSLogic {



    /**
     * DestroyCardInPlay
     *
 	 */
    export class DestroyCardInPlay extends jsLogic.IAction<HsGameCtx> {

        resolve(_this_: DestroyCardInPlay, param: HsGameCtx): PromiseOfActions {
            return new Promise<HsAction[]>(
                (resolve, reject): void => {

                });
        }

        constructor(source: jsLogic.IAction<HsGameCtx>, public card: Card) {
            super(source);
        };
    }
}