///<reference path="../core/HsAction.ts"/>
///<reference path="../core/HsActionEvent.ts"/> 
///<reference path="../../core/action/helperActions/CancellableAction.ts"/>

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