///<reference path="../IAction.ts"/>
///<reference path="../../event/Event.ts"/>

"use strict";

namespace jsLogic {


    export interface IActionToBroadcast<T extends IExtContext, P extends IActionParam> {
        eventParam: P,
        action: IAction<T>,
        onBeforeEventBuilder: EventBuilder<T, P>,
        onAfterEventBuilder: EventBuilder<T, P>
    }


    /**
     * BroadcastAction 
     *
     */
    export class BroadcastAction<T extends IExtContext, P extends IActionParam> extends BroadcastableActionWrapper<T, P> {

        constructor( public action2Broadcast: IActionToBroadcast<T, P> ) {
            super( new BroadcastableInnerAction( action2Broadcast ) );
        }
    }



    /**
     * BroadcastableInnerAction 
     *
     */
    class BroadcastableInnerAction<T extends IExtContext, P extends IActionParam> extends BroadcastableAction<T, P> {

        resolve( _this_: BroadcastableInnerAction<T, P>, context: T ): PromiseOfActions {
            return new Promise<IAction<T>[]>(
                ( resolve, reject ): void => {
                    resolve( [
                        _this_.action2Broadcast.action
                    ] )
                });
        }

        onBeforeEventBuilder( eventParam: P ): ActionEvent<T, P> { return this.action2Broadcast.onBeforeEventBuilder( eventParam ) }

        onAfterEventBuilder( eventParam: P ): ActionEvent<T, P> { return this.action2Broadcast.onAfterEventBuilder( eventParam ) }

        constructor( public action2Broadcast: IActionToBroadcast<T, P> ) {
            super( action2Broadcast.eventParam );
        }
    }
}