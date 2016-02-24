///<reference path="../IAction.ts"/>
///<reference path="../../event/EventHandlers.ts"/>
///<reference path="../../event/Event.ts"/>

"use strict";

namespace jsLogic {

    export class OnBeforeMainActionEvent<T extends IHasHandlersAndBuilder> extends ActionEvent<T> {
        cancelMainAction: boolean = false;
    }


    /**
     *  CancellableAction<T>
     * 
     */
    export abstract class CancellableAction<T extends IHasHandlersAndBuilder, E extends OnBeforeMainActionEvent<T>> extends IAction<T> {

        resolve(_this_: CancellableAction<T, E>, param: T): PromiseOfActions<T> {
            return new Promise<IAction<T>[]>(

                (resolve, reject): void => {
                    let onBeforeMainActionEvent: OnBeforeMainActionEvent<T> = _this_.buildOnBeforeEvent(param);

                    if (onBeforeMainActionEvent) {
                        let actions: IAction<T>[] = [
                            new DispatchEventAction<T>(onBeforeMainActionEvent),
                            _this_.buildMainAction(param, onBeforeMainActionEvent)
                        ];

                        resolve(actions);
                    } else
                        reject(new Error(`[${this}] 'onBeforeEvent' had not beed created.`));
                });
        }


        abstract buildMainAction(param: T, onBeforeEvent: OnBeforeMainActionEvent<T>): MainAction<T, E>;
        abstract buildOnBeforeEvent(param: T): OnBeforeMainActionEvent<T>;
    }


    /**
     *  MainActionWrapper<T>
     * 
     */
    export abstract class MainAction<T extends IHasHandlersAndBuilder, E extends OnBeforeMainActionEvent<T>> extends IAction<T> {

        resolve(_this_: MainAction<T, E>, param: T): PromiseOfActions<T> {
            return new Promise<IAction<T>[]>(

                (resolve, reject): void => {

                    let actions: IAction<T>[] = [];

                    if (_this_.mainActionToBeResolvedCheck(param)) {
                        actions.push(_this_.mainActionResolver(param));

                        if (_this_.doDispatchOnAfterEvent(param)) {
                            let onAfterMainActionEvent: ActionEvent<T> = _this_.buildOnAfterEvent(param);
                            actions.push(new DispatchEventAction<T>(onAfterMainActionEvent));
                        }
                    }

                    resolve(actions);
                });
        }


        abstract mainActionResolver(param: T): IAction<T>;

        abstract buildOnAfterEvent(param: T): ActionEvent<T>;


        constructor(protected onBeforeEvent: E) {
            super(onBeforeEvent.source);
        }

        protected mainActionToBeResolvedCheck(param: T): boolean {
            return !this.onBeforeEvent.cancelMainAction;
        }

        protected doDispatchOnAfterEvent(param: T): boolean {
            return true;
        }
    }

}