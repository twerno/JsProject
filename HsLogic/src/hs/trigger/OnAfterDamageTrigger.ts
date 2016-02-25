///<reference path="../../core/event/EventHandler.ts"/>
///<reference path="../core/HsActionParam.ts"/>

"use strict";

namespace HSLogic {

    export class OnAfterDamageTrigger extends HsEventHandler {

        isRespondingTo(event: HsActionEvent): boolean {
            return event.type === OnAfterDamageEvent.type;
        };

        trigger(event: HsActionEvent): jsLogic.IAction<HsActionParam> {
            return new EmptyAction(event.param.sourceAction, `${this}: action`);
        };
    }
}