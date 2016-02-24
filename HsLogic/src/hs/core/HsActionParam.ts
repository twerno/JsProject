///<reference path="../../core/event/IActionParam.ts"/>
///<reference path="../../core/event/EventHandlers.ts"/>

"use strict";

namespace HSLogic {

    export class HsActionParam implements jsLogic.IHasHandlersAndBuilder {

        handlers: jsLogic.EventHandlers<HsActionParam> = new jsLogic.EventHandlers<HsActionParam>();

        actionBuilder: HsActionBuilder<HsActionParam> = new HsActionBuilder<HsActionParam>();
    }
}