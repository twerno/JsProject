///<reference path="../../core/event/EventHandler.ts"/>
///<reference path="../core/HsActionParam.ts"/>

"use strict";

namespace HSLogic {

    export class OnDamageCalculationTrigger extends HsEventHandler {

        isRespondingTo(event: HsActionEvent<DamageParam>): boolean {
            return event.type === OnDamageCalculationEvent.type;
        };

        trigger(event: HsActionEvent<DamageParam>): jsLogic.IAction<HsActionParam> {
            return new EmptyAction(event.param.sourceAction, `${this}: action`);
        };
    }
}