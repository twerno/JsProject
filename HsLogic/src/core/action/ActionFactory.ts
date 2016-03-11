///<reference path="IAction.ts"/>
///<reference path="helperActions/DispatchEventAction.ts"/>
///<reference path="helperActions/Selector.ts"/>
///<reference path="abstractActions/CancelableAction.ts"/>
///<reference path="abstractActions/BroadcastableAction.ts"/>
///<reference path="helperActions/BroadcastAction.ts"/>

"use strict";

namespace jsLogic {

    export class ActionFactory {

        dispatch<T extends IExtContext, P extends IActionParam>(event: ActionEvent<T, P>): DispatchEventAction<T, P> {
            if (event)
                return new DispatchEventAction<T, P>(event)
            else
                return null;
        }


        //dispatchEvent<T extends IActionContext, P extends IActionParam>(eventName: string, param: P): DispatchEventAction<T, P> {
        //    return this.dispatch(
        //        new ActionEvent<T, P>(eventName, param));
        //}


        randomSelector<T extends IExtContext, O>(source: IAction<T>, selectorParam: SelectorParam<O>, resultSet: O[]): RandomSelector<T, O> {
            return new RandomSelector<T, O>(source, selectorParam, resultSet);
        }


        broadcastAction<T extends IExtContext, P extends IActionParam>(action2Broadcast: IActionToBroadcast<T, P>): BroadcastAction<T, P> {
            return new BroadcastAction<T, P>(action2Broadcast);
        }
    }
}