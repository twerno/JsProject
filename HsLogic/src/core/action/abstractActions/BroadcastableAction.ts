///<reference path="../IAction.ts"/>
///<reference path="../../event/Event.ts"/>

"use strict";

namespace jsLogic {


    /**
     * BroadcastableAction 
     *
     */
    export abstract class BroadcastableAction<T extends IExtContext, P extends IActionParam> extends IAction<T> {

        abstract onBeforeEventBuilder( eventParam: P ): ActionEvent<T, P>;
        abstract onAfterEventBuilder( eventParam: P ): ActionEvent<T, P>;


        wrapIt(): BroadcastableActionWrapper<T, P> {
            return new BroadcastableActionWrapper( this );
        }


        constructor( public param: P ) {
            super( param.source );
        }
    }



    /**
     * BroadcastableActionWrapper 
     *
     */
    export class BroadcastableActionWrapper<T extends IExtContext, P extends IActionParam> extends IAction<T> {

        resolve( self: BroadcastableActionWrapper<T, P>, context: T ): PromiseOfActions {
            return new Promise<IAction<T>[]>(
                ( resolve, reject ): void => {

                    let innerAction: BroadcastableAction<T, P> = self.broadcastableAction;
                    let eventParam: P = innerAction.param;

                    resolve( [
                        context.actionFactory.dispatch( innerAction.onBeforeEventBuilder( eventParam ) ),
                        innerAction,
                        new InlineAction(( resolve, reject ): void => {
                            resolve( [
                                context.actionFactory.dispatch( innerAction.onAfterEventBuilder( eventParam ) )
                            ] );
                        })
                    ] );
                });
        }


        constructor( public broadcastableAction: BroadcastableAction<T, P> ) {
            super( broadcastableAction.param.source );
        }
    }
}