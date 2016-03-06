"use strict";

namespace jsLogic {


    export interface IHasHandlersAndFactory extends IHasActionFactory {
        handlers: EventHandlers<IHasHandlersAndFactory, IEventParam<IHasHandlersAndFactory>>;
    }

}