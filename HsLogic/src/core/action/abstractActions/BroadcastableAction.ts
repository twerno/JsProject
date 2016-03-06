///<reference path="../IAction.ts"/>
///<reference path="../../event/Event.ts"/>

"use strict";

namespace jsLogic {


    /**
     * BroadcastableAction 
     *
     */
    export abstract class BroadcastableAction<T extends IHasHandlersAndFactory, P extends IEventParam<T>> extends IAction<T> {

        abstract buildOnBeforeEvent(eventParam: P): ActionEvent<T, P>;
        abstract buildOnAfterEvent(eventParam: P): ActionEvent<T, P>;


        wrapIt(): BroadcastableActionWrapper<T, P> {
            return new BroadcastableActionWrapper(this);
        }


        constructor(public eventParam: P) {
            super(eventParam.sourceAction);
        }
    }



    /**
     * BroadcastableActionWrapper 
     *
     */
    export class BroadcastableActionWrapper<T extends IHasHandlersAndFactory, P extends IEventParam<T>> extends IAction<T> {

        resolve(_this_: BroadcastableActionWrapper<T, P>, param: T): PromiseOfActions<T> {
            return new Promise<IAction<T>[]>(
                (resolve, reject): void => {

                    let innerAction: BroadcastableAction<T, P> = _this_.broadcastableAction;
                    let eventParam: P = innerAction.eventParam;

                    resolve([
                        param.actionFactory.dispatch(innerAction.buildOnBeforeEvent(eventParam)),
                        innerAction,
                        param.actionFactory.dispatch(innerAction.buildOnAfterEvent(eventParam))
                    ]);
                });
        }


        constructor(public broadcastableAction: BroadcastableAction<T, P>) {
            super(broadcastableAction.eventParam.sourceAction);
        }
    }
}