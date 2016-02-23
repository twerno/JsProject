///<reference path="../../core/event/EventHandler.ts"/>
///<reference path="../HsActionParam.ts"/>

"use strict";

namespace HSLogic {

    export class OnDamageCalculationTrigger extends jsLogic.EventHandler {

        isRespondingTo(event: HsActionEvent): boolean {
            return event.type === OnDamageCalculationEvent.type;
        };

        trigger(event: HsActionEvent): jsLogic.IAction<HsActionParam> {
            return new EmptyAction(event.source, `${this}: action`);
        };
    }
}