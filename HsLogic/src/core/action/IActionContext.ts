"use strict";

namespace jsLogic {


    export interface IContext extends IHasActionFactory {
        handlers: EventHandlers<IContext, IActionParam<IContext>>;
    }

    export class IActionParam<T extends IContext> {
        sourceAction: IAction<T>
    }

}