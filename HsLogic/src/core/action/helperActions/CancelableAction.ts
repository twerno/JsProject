///<reference path="../IAction.ts"/>
///<reference path="../../event/EventHandlers.ts"/>
///<reference path="../../event/Event.ts"/>

"use strict";

namespace jsLogic {

    /**
     *  CancelableAction<T>
     * 
     */
    export abstract class CancelableAction<T extends IHasHandlersAndBuilder, P extends IEventParam<T>> extends IAction<T> {

        abstract buildOnBeforeEvent(eventParam: P): ActionEvent<T, P>;
        abstract buildOnAfterEvent(eventParam: P): ActionEvent<T, P>;
        abstract doCancelAction(eventParam: P): boolean;
        abstract doCancelOnAfterEvent(eventParam: P): boolean;


        wrapIt(): CancellableActionExternalWrapper<T, P> {
            return new CancellableActionExternalWrapper(this);
        }


        constructor(public eventParam: P) {
            super(eventParam.sourceAction);
        };
    }



    /**
     * CancellableActionExternalWrapper 
     *
     */
    export class CancellableActionExternalWrapper<T extends IHasHandlersAndBuilder, P extends IEventParam<T>> extends IAction<T> {
        resolve(_this_: CancellableActionExternalWrapper<T, P>, param: T): PromiseOfActions<T> {
            return new Promise<IAction<T>[]>(

                (resolve, reject): void => {

                    let eventParam: P = _this_.mainAction.eventParam;
                    let onBeforeEvent: ActionEvent<T, P> = _this_.mainAction.buildOnBeforeEvent(eventParam);

                    if (!onBeforeEvent)
                        reject(new Error(`[${_this_.mainAction}] 'onBeforeEvent' had not beed created.`));

                    resolve([
                        param.actionBuilder.dispatch(onBeforeEvent),
                        new CancellableActionInternalWrapper(_this_.mainAction)
                    ]);

                });
        }


        constructor(public mainAction: CancelableAction<T, P>) {
            super(mainAction.eventParam.sourceAction);
        };
    }



    /**
     * CancellableActionInternalWrapper 
     *
     */
    class CancellableActionInternalWrapper<T extends IHasHandlersAndBuilder, P extends IEventParam<T>> extends IAction<T> {
        resolve(_this_: CancellableActionInternalWrapper<T, P>, param: T): PromiseOfActions<T> {
            return new Promise<IAction<T>[]>(

                (resolve, reject): void => {
                    let eventParam: P = _this_.mainAction.eventParam;

                    if (_this_.mainAction.doCancelAction(eventParam)) {
                        resolve(NO_CONSEQUENCES);
                        return;
                    }

                    let actions: IAction<T>[] = [_this_.mainAction];

                    if (!_this_.mainAction.doCancelOnAfterEvent(eventParam)) {
                        let onAfterEvent: ActionEvent<T, P> = _this_.mainAction.buildOnAfterEvent(eventParam);

                        actions.push(param.actionBuilder.dispatch(onAfterEvent));
                    }

                    resolve(actions);

                });
        }


        constructor(public mainAction: CancelableAction<T, P>) {
            super(mainAction.eventParam.sourceAction);
        };
    }
}