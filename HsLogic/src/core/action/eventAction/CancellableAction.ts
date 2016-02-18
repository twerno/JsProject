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

        resolve(thisAction: CancellableAction<T, E>, param: T): PromiseOfActions<T> {
            return new Promise<IAction<T>[]>(

                (resolve, reject): void => {
                    let onBeforeMainActionEvent: OnBeforeMainActionEvent<T> = thisAction.getOnBeforeMainActionResolveEvent(param);

                    if (onBeforeMainActionEvent) {
                        let actions: IAction<T>[] = [];

                        actions.push(new DispatchEventAction<T>(onBeforeMainActionEvent));
                        actions.push(thisAction.getMainAction(param, onBeforeMainActionEvent));

                        resolve(actions);
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

        resolve(thisAction: MainAction<T, E>, param: T): PromiseOfActions<T> {
            return new Promise<IAction<T>[]>(

                (resolve, reject): void => {

                    let actions: IAction<T>[] = [];

                    if (thisAction.doResolveMainAction(param)) {
                        actions.push(thisAction.mainActionResolver(param));

                        if (thisAction.doDispatchOnAfterEvent(param)) {
                            let onAfterMainActionEvent: ActionEvent<T> = thisAction.onAfterMainActionEvent(param);
                            actions.push(new DispatchEventAction<T>(onAfterMainActionEvent));
                        }
                    }

                    resolve(actions);
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