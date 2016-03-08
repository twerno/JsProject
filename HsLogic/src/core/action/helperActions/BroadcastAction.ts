///<reference path="../IAction.ts"/>
///<reference path="../../event/Event.ts"/>

"use strict";

namespace jsLogic {


    export interface IActionToBroadcast<T extends IActionContext, P extends IActionParam<T>> {
        eventParam: P,
        action: IAction<T>,
        onBeforeEvent: ActionEvent<T, P>,
        onAfterEvent: ActionEvent<T, P>
    }


    /**
     * BroadcastAction 
     *
     */
    export class BroadcastAction<T extends IActionContext, P extends IActionParam<T>> extends BroadcastableActionWrapper<T, P> {

        constructor(public action2Broadcast: IActionToBroadcast<T, P>) {
            super(new BroadcastableInnerAction(action2Broadcast));
        }
    }



    /**
     * BroadcastableInnerAction 
     *
     */
    class BroadcastableInnerAction<T extends IActionContext, P extends IActionParam<T>> extends BroadcastableAction<T, P> {

        resolve(_this_: BroadcastableInnerAction<T, P>, context: T): PromiseOfActions<T> {
            return new Promise<IAction<T>[]>(
                (resolve, reject): void => {
                    resolve([
                        _this_.action2Broadcast.action
                    ])
                });
        }

        buildOnBeforeEvent(eventParam: P): ActionEvent<T, P> {
            return this.action2Broadcast.onBeforeEvent;
        }

        buildOnAfterEvent(eventParam: P): ActionEvent<T, P> {
            return this.action2Broadcast.onAfterEvent;
        }

        constructor(public action2Broadcast: IActionToBroadcast<T, P>) {
            super(action2Broadcast.eventParam);
        }
    }
}