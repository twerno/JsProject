///<reference path="../HsAction.ts"/>
///<reference path="../HsActionEvent.ts"/> 
///<reference path="../../core/action/eventAction/CancellableAction.ts"/>

"use strict";

namespace HSLogic {



    /**
     * DestroyCardInPlay
     *
 	 */
    export class DestroyCardInPlay extends jsLogic.IAction<HsActionParam> {

        resolve(_this_: DestroyCardInPlay, param: HsActionParam): PromiseOfActions {
            return new Promise<HsAction[]>(
                (resolve, reject): void => {

                });
        }

        constructor(source: jsLogic.IAction<HsActionParam>, public card: Card) {
            super(source);
        };
    }
}