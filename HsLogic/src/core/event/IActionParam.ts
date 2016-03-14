"use strict";

namespace jsLogic {


    export interface IHasHandlersAndBuilder extends IHasActionBuilder {
        handlers: EventHandlers<IEventParam<IHasHandlersAndBuilder>, IHasHandlersAndBuilder>;
    }

}