///<reference path="../IAction.ts"/>
///<reference path="../../event/EventHandlers.ts"/>

"use strict";

namespace jsLogic {
	
    /**
     * Collect actions from handlers which respond to event 
     *
 	 */
    export class DispatchEventAction<T extends IActionParam> extends IAction<T> {

        resolve(_this_: DispatchEventAction<T>, param: T): PromiseOfActions<T> {
            return new Promise<IAction<T>[]>(
                (resolve, reject): void => {

                    let consequences: IAction<T>[] = param.handlers.collectResponsesOf(_this_.event);

                    // first action returned will be the first action to resolve
                    resolve(consequences);
                });
        }


        constructor(public event: ActionEvent<T>) {
            super(event.source);
        };
    }

}