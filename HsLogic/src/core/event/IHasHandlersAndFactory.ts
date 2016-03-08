"use strict";

namespace jsLogic {


    export interface IActionContext extends IHasActionFactory {
        handlers: EventHandlers<IActionContext, IActionParam<IActionContext>>;
    }

}