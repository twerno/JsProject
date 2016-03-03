///<reference path="../core/HsActionEvent.ts"/>
///<reference path="../core/HsGameEnv.ts"/>

"use strict";

namespace HSLogic {

    export class OnDamageCalculationTrigger extends HsEventHandler {

        isRespondingTo(event: HsActionEvent<DamageParam>): boolean {
            return event.type === OnDamageCalculationEvent.type;
        };

        trigger(event: HsActionEvent<DamageParam>, gameEnv: HsGameEnv): jsLogic.IAction<HsGameEnv> {
            return gameEnv.actionFactory.emptyAction(event.param.sourceAction, `${this}: action`);
        };
    }
}