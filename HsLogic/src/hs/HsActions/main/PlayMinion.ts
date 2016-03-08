///<reference path="../../core/HsAction.ts"/>
///<reference path="../../core/HsActionEvent.ts"/> 
///<reference path="../../../core/action/abstractActions/CancelableAction.ts"/>

"use strict";

namespace HSLogic {


    /**
     * PlayCard
     *
 	 */
    export class PlayMinion extends jsLogic.CancelableAction<HsGameCtx, PlayMinionParam> {

        cancelAction(eventParam: PlayMinionParam): boolean {
            return eventParam.cancelAction;
        }


        cancelOnAfterEvent(eventParam: PlayMinionParam): boolean {
            return eventParam.cancelAction;
        }


        resolve(_this_: PlayMinion, gameCtx: HsGameCtx): PromiseOfActions {
            return new Promise<HsAction[]>(

                (resolve, reject): void => {
                    let actions: jsLogic.IAction<HsGameCtx>[] = [
                        gameCtx.actionFactory.payCostAndRemoveFromHand(_this_.param)
                    ];

                    //if (_this_.param.card.type === CARD_TYPE.MINION)



                    // pay cost & remove from hand
                    // delegate to play spell, play minon or play weapon action
                    // 

                    resolve(actions);
                }
            );
        }
    }
}