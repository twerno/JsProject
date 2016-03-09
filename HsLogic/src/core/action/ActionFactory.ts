///<reference path="IAction.ts"/>
///<reference path="helperActions/DispatchEventAction.ts"/>
///<reference path="helperActions/Selector.ts"/>
///<reference path="abstractActions/CancelableAction.ts"/>
///<reference path="abstractActions/BroadcastableAction.ts"/>
///<reference path="helperActions/BroadcastAction.ts"/>

"use strict";

namespace jsLogic {

    export class ActionFactory {

        dispatch<T extends IContext, P extends IActionParam<T>>(event: ActionEvent<T, P>): DispatchEventAction<T, P> {
            return new DispatchEventAction<T, P>(event);
        }


        //dispatchEvent<T extends IActionContext, P extends IActionParam<T>>(eventName: string, param: P): DispatchEventAction<T, P> {
        //    return this.dispatch(
        //        new ActionEvent<T, P>(eventName, param));
        //}


        randomSelector<T extends IContext, O>(source: IAction<T>, selectorParam: SelectorParam<O>, resultSet: O[]): RandomSelector<T, O> {
            return new RandomSelector<T, O>(source, selectorParam, resultSet);
        }


        broadcastAction<T extends IContext, P extends IActionParam<T>>(action2Broadcast: IActionToBroadcast<T, P>): BroadcastAction<T, P> {
            return new BroadcastAction<T, P>(action2Broadcast);
        }
    }
}