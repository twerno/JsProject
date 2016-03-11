///<reference path="../IAction.ts"/>
///<reference path="../../event/Event.ts"/>

"use strict";

namespace jsLogic {


    /**
     * BroadcastableAction 
     *
     */
    export abstract class BroadcastableAction<T extends IExtContext, P extends IActionParam> extends IAction<T> {

        abstract onBeforeEventBuilder(eventParam: P): ActionEvent<T, P>;
        abstract onAfterEventBuilder(eventParam: P): ActionEvent<T, P>;


        wrapIt(): BroadcastableActionWrapper<T, P> {
            return new BroadcastableActionWrapper(this);
        }


        constructor(public param: P) {
            super(param.source.action);
        }
    }



    /**
     * BroadcastableActionWrapper 
     *
     */
    export class BroadcastableActionWrapper<T extends IExtContext, P extends IActionParam> extends IAction<T> {

        resolve(_this_: BroadcastableActionWrapper<T, P>, context: T): PromiseOfActions {
            return new Promise<IAction<T>[]>(
                (resolve, reject): void => {

                    let innerAction: BroadcastableAction<T, P> = _this_.broadcastableAction;
                    let eventParam: P = innerAction.param;

                    resolve([
                        context.actionFactory.dispatch(innerAction.onBeforeEventBuilder(eventParam)),
                        innerAction,
                        new InlineAction((resolve, reject): void => {
                            resolve([
                                context.actionFactory.dispatch(innerAction.onAfterEventBuilder(eventParam))
                            ]);
                        }
                        )
                    ]);
                });
        }


        constructor(public broadcastableAction: BroadcastableAction<T, P>) {
            super(broadcastableAction.param.source.action);
        }
    }
}