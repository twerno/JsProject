///<reference path="../../core/event/EventHandler.ts"/>
///<reference path="../HsActionParam.ts"/>

"use strict";

namespace HSLogic {

    export class OnBeforeDamageTrigger extends jsLogic.EventHandler {

        isRespondingTo(event: HsActionEvent): boolean {
            return event.type === OnBeforeDamageEvent.type;
        };

        trigger(event: HsActionEvent): jsLogic.IAction<HsActionParam> {
            return new EmptyAction(`${this}: action`);
        };
    }
}