///<reference path="IAction.ts"/>
///<reference path="helperActions/DispatchEventAction.ts"/>
///<reference path="helperActions/Selector.ts"/>
///<reference path="helperActions/CancelableAction.ts"/>
///<reference path="helperActions/BroadcastableAction.ts"/>
///<reference path="helperActions/BroadcastAction.ts"/>

namespace jsLogic {

    export class ActionBuilder {

        dispatch<T extends IHasHandlersAndBuilder, P extends IEventParam<T>>(event: ActionEvent<T, P>): DispatchEventAction<T, P> {
            return new DispatchEventAction<T, P>(event);
        }


        randomSelector<T extends IHasHandlersAndBuilder, O>(source: IAction<T>, selectorParam: SelectorParam<O>, resultSet: O[]): RandomSelector<T, O> {
            return new RandomSelector<T, O>(source, selectorParam, resultSet);
        }


        //        cancalableAction<T extends IHasHandlersAndBuilder, P extends IEventParam<T>>(cancelableAction: ICancellableAction<T, P>): CancelableAction<T, P> {
        //            return new CancelableAction<T, P>(cancelableAction);
        //        }


        broadcastAction<T extends IHasHandlersAndBuilder, P extends IEventParam<T>>(action2Broadcast: IActionToBroadcast<T, P>): BroadcastAction<T, P> {
            return new BroadcastAction<T, P>(action2Broadcast);
        }
    }
}