///<reference path="../IAction.ts"/>
///<reference path="../../event/EventHandlers.ts"/>
///<reference path="../../event/Event.ts"/>

"use strict";

namespace jsLogic {

    export class OnBeforeMainActionEvent<T extends IActionParam> extends ActionEvent<T> {
        cancelMainAction: boolean = false;
    }


    /**
     *  CancellableAction<T>
     * 
     */
    export abstract class CancellableAction<T extends IActionParam, E extends OnBeforeMainActionEvent<IActionParam>> extends IAction<T> {

        resolve(param: T): PromiseOfActions<T> {
            return new Promise<IAction<T>[]>(

                (resolve, reject): void => {
                    let onBeforeMainActionResolve: OnBeforeMainActionEvent<T> = this.getOnBeforeMainActionResolveEvent(param);

                    if (event) {
                        let responses: IAction<T>[] = param.handlers.collectResponsesOf(onBeforeMainActionResolve);
                        let mainAction: IAction<T> = this.getMainAction(param, onBeforeMainActionResolve);

                        resolve(responses.concat([mainAction]));
                    } else
                        reject(new Error(`[${this}] 'onBeforeEvent' had not beed created.`));
                });
        }


        abstract getMainAction(param: T, onBeforeEvent: OnBeforeMainActionEvent<T>): MainAction<T, E>;
        abstract getOnBeforeMainActionResolveEvent(param: T): OnBeforeMainActionEvent<T>;
    }


    /**
     *  MainActionWrapper<T>
     * 
     */
    export abstract class MainAction<T extends IActionParam, E extends OnBeforeMainActionEvent<IActionParam>> extends IAction<T> {

        resolve(param: T): PromiseOfActions<T> {
            return new Promise<IAction<T>[]>(

                (resolve, reject): void => {

                    if (!this.doResolveMainAction(param)) {
                        resolve(null);
                        return;
                    }

                    let mainSubAction: IAction<T> = this.mainActionResolver(param);
                    let eventShouldBeDispatched: boolean = this.doDispatchOnAfterEvent(param);

                    if (mainSubAction && eventShouldBeDispatched) {
                        let onAfterMainActionEvent: ActionEvent<T> = this.onAfterMainActionEvent(param);
                        let consequences: IAction<T>[] = param.handlers.collectResponsesOf(onAfterMainActionEvent)
                        resolve([mainSubAction].concat(consequences));

                    } else if (mainSubAction && !eventShouldBeDispatched) {
                        resolve([mainSubAction])

                    } else
                        resolve(null);
                });
        }


        abstract mainActionResolver(param: T): IAction<T>;

        abstract onAfterMainActionEvent(param: T): ActionEvent<T>;


        constructor(protected onBeforeEvent: E) {
            super(onBeforeEvent.source);
        }

        protected doResolveMainAction(param: T): boolean {
            return !this.onBeforeEvent.cancelMainAction;
        }

        protected doDispatchOnAfterEvent(param: T): boolean {
            return true;
        }
    }

}