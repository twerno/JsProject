"use strict";

namespace jsLogic {


    export interface IHasHandlersAndBuilder extends IHasActionBuilder {
        handlers: EventHandlers<IHasHandlersAndBuilder, IEventParam<IHasHandlersAndBuilder>>;
    }

}