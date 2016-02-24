///<reference path="IAction.ts"/>
///<reference path="helperActions/DispatchEventAction.ts"/>
///<reference path="helperActions/Selector.ts"/>

namespace jsLogic {

    export class ActionBuilder {

        dispatchEvent<T extends IHasHandlersAndBuilder>(event: ActionEvent<T>): DispatchEventAction<T> {
            return new DispatchEventAction<T>(event);
        }


        randomSelector<T extends IHasHandlersAndBuilder, O>(source: IAction<T>, selectorParam: SelectorParam<O>, resultSet: O[]): RandomSelector<T, O> {
            return new RandomSelector<T, O>(source, selectorParam, resultSet);
        }
    }
}