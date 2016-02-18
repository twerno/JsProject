///<reference path="../../core/event/EventHandler.ts"/>
///<reference path="../HsActionParam.ts"/>

"use strict";

namespace HSLogic {

    export class OnAfterDamageTrigger extends jsLogic.EventHandler {

        isRespondingTo(event: HsActionEvent): boolean {
            return event.type === OnAfterDamageEvent.type;
        };

        trigger(event: HsActionEvent): jsLogic.IAction<HsActionParam> {
            return new EmptyAction(`${this}: action`);
        };
    }
}