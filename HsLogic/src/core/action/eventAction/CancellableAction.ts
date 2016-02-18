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

        resolve(_this_: CancellableAction<T, E>, param: T): PromiseOfActions<T> {
            return new Promise<IAction<T>[]>(

                (resolve, reject): void => {
                    let onBeforeMainActionEvent: OnBeforeMainActionEvent<T> = _this_.getOnBeforeMainActionResolveEvent(param);

                    if (onBeforeMainActionEvent) {
                        let actions: IAction<T>[] = [];

                        actions.push(new DispatchEventAction<T>(onBeforeMainActionEvent));
                        actions.push(_this_.getMainAction(param, onBeforeMainActionEvent));

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

        resolve(_this_: MainAction<T, E>, param: T): PromiseOfActions<T> {
            return new Promise<IAction<T>[]>(

                (resolve, reject): void => {

                    let actions: IAction<T>[] = [];

                    if (_this_.doResolveMainAction(param)) {
                        actions.push(_this_.mainActionResolver(param));

                        if (_this_.doDispatchOnAfterEvent(param)) {
                            let onAfterMainActionEvent: ActionEvent<T> = _this_.onAfterMainActionEvent(param);
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