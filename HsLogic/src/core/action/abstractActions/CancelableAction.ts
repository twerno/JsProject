///<reference path="../IAction.ts"/>
///<reference path="../../event/EventHandlers.ts"/>
///<reference path="../../event/Event.ts"/>

"use strict";

namespace jsLogic {

    /**
     *  CancelableAction<T>
     * 
     */
    export abstract class CancelableAction<T extends IExtContext, P extends IActionParam> extends IAction<T> {

        abstract cancelAction( eventParam: P ): boolean;
        abstract cancelOnAfterEvent( eventParam: P ): boolean;
        abstract onBeforeEventBuilder( param: P ): ActionEvent<T, P>;
        abstract onAfterEventBuilder( param: P ): ActionEvent<T, P>;


        wrapIt(): CancellableActionExternalWrapper<T, P> {
            return new CancellableActionExternalWrapper( this );
        }


        constructor( public param: P ) {
            super( param.source );
        };
    }



    /**
     * CancellableActionExternalWrapper 
     *
     */
    export class CancellableActionExternalWrapper<T extends IExtContext, P extends IActionParam> extends IAction<T> {
        resolve( self: CancellableActionExternalWrapper<T, P>, context: T ): PromiseOfActions {
            return new Promise<IAction<T>[]>(

                ( resolve, reject ): void => {

                    let param: P = self.mainAction.param;
                    let onBeforeEvent: ActionEvent<T, P> = self.mainAction.onBeforeEventBuilder( param );

                    if ( !onBeforeEvent )
                        reject( new Error( `[${self.mainAction}] 'onBeforeEvent' had not beed created.` ) );

                    resolve( [
                        context.actionFactory.dispatch( onBeforeEvent ),
                        new CancellableActionInternalWrapper( self.mainAction )
                    ] );

                });
        }


        constructor( public mainAction: CancelableAction<T, P> ) {
            super( mainAction.param.source );
        };
    }



    /**
     * CancellableActionInternalWrapper 
     *
     */
    class CancellableActionInternalWrapper<T extends IExtContext, P extends IActionParam> extends IAction<T> {
        resolve( self: CancellableActionInternalWrapper<T, P>, context: T ): PromiseOfActions {
            return new Promise<IAction<T>[]>(

                ( resolve, reject ): void => {
                    let param: P = self.mainAction.param;

                    if ( self.mainAction.cancelAction( param ) ) {
                        resolve( NO_CONSEQUENCES );
                        return;
                    }

                    let actions: IAction<T>[] = [self.mainAction];

                    if ( !self.mainAction.cancelOnAfterEvent( param ) ) {
                        let onAfterEvent: ActionEvent<T, P> = self.mainAction.onAfterEventBuilder( param );

                        actions.push( context.actionFactory.dispatch( onAfterEvent ) );
                    }

                    resolve( actions );

                });
        }


        constructor( public mainAction: CancelableAction<T, P> ) {
            super( mainAction.param.source );
        };
    }
}