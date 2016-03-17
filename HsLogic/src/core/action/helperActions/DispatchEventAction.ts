///<reference path="../IAction.ts"/>
///<reference path="../../event/EventHandlers.ts"/>

"use strict";

namespace jsLogic {

    /**
     * Collect actions from handlers which respond to event 
     *
 	 */
    export class DispatchEventAction<T extends IExtContext, P extends IActionParam> extends IAction<T> {

        resolve( self: DispatchEventAction<T, P>, context: T ): PromiseOfActions {
            return new Promise<IAction<T>[]>(
                ( resolve, reject ): void => {

                    // first action returned will be the first action to resolve
                    resolve(
                        context.handlers.collectResponsesOf( self.event, context )
                    );
                });
        }


        constructor( public event: ActionEvent<T, P> ) {
            super( event.param.source );
        };
    }

}