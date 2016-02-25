///<reference path="../../core/event/IActionParam.ts"/>
///<reference path="../../core/event/EventHandlers.ts"/>

"use strict";

namespace HSLogic {

    export class HsActionParam implements jsLogic.IHasHandlersAndBuilder {

        zones: HsZones;

        handlers: jsLogic.EventHandlers<HsActionParam, HsEventParam> = new jsLogic.EventHandlers<HsActionParam, HsEventParam>();

        actionBuilder: HsActionBuilder<HsActionParam> = new HsActionBuilder<HsActionParam>();
    }
}