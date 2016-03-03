///<reference path="../core/HsAction.ts"/>
///<reference path="../core/HsActionEvent.ts"/> 


"use strict";

namespace HSLogic {



    /**
     * DestroyCardInPlay
     *
 	 */
    export class DestroyCardInPlay extends jsLogic.IAction<HsGameEnv> {

        resolve(_this_: DestroyCardInPlay, param: HsGameEnv): PromiseOfActions {
            return new Promise<HsAction[]>(
                (resolve, reject): void => {

                });
        }

        constructor(source: jsLogic.IAction<HsGameEnv>, public card: Card) {
            super(source);
        };
    }
}