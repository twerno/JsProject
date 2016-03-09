"use strict";

namespace jsLogic {

    //export interface IExtActionParam extends IActionParam {

    //}

    export interface IExtContext extends IContext {
        handlers: EventHandlers<IExtContext, IActionParam>;
    }



}