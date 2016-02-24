///<reference path="../../core/event/EventHandler.ts"/>
///<reference path="../core/HsActionParam.ts"/>

"use strict";

namespace HSLogic {

    export class OnDamageCalculationTrigger extends HsEventHandler {

        isRespondingTo(event: HsActionEvent): boolean {
            return event.type === OnDamageCalculationEvent.type;
        };

        trigger(event: HsActionEvent): jsLogic.IAction<HsActionParam> {
            return new EmptyAction(event.source, `${this}: action`);
        };
    }
}