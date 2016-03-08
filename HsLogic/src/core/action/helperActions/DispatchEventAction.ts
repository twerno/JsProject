///<reference path="../IAction.ts"/>
///<reference path="../../event/EventHandlers.ts"/>

"use strict";

namespace jsLogic {

    /**
     * Collect actions from handlers which respond to event 
     *
 	 */
    export class DispatchEventAction<T extends IActionContext, P extends IActionParam<T>> extends IAction<T> {

        resolve(_this_: DispatchEventAction<T, P>, context: T): PromiseOfActions<T> {
            return new Promise<IAction<T>[]>(
                (resolve, reject): void => {

                    let consequences: IAction<T>[] = context.handlers.collectResponsesOf(_this_.event, context);

                    // first action returned will be the first action to resolve
                    resolve(consequences);
                });
        }


        constructor(public event: ActionEvent<T, P>) {
            super(event.param.sourceAction);
        };
    }

}