///<reference path="IAction.ts"/>
///<reference path="helperActions/DispatchEventAction.ts"/>
///<reference path="helperActions/Selector.ts"/>
///<reference path="abstractActions/CancelableAction.ts"/>
///<reference path="abstractActions/BroadcastableAction.ts"/>
///<reference path="helperActions/BroadcastAction.ts"/>

namespace jsLogic {

    export class ActionFactory {

        dispatch<T extends IHasHandlersAndFactory, P extends IEventParam<T>>(event: ActionEvent<T, P>): DispatchEventAction<T, P> {
            return new DispatchEventAction<T, P>(event);
        }


        randomSelector<T extends IHasHandlersAndFactory, O>(source: IAction<T>, selectorParam: SelectorParam<O>, resultSet: O[]): RandomSelector<T, O> {
            return new RandomSelector<T, O>(source, selectorParam, resultSet);
        }


        broadcastAction<T extends IHasHandlersAndFactory, P extends IEventParam<T>>(action2Broadcast: IActionToBroadcast<T, P>): BroadcastAction<T, P> {
            return new BroadcastAction<T, P>(action2Broadcast);
        }
    }
}