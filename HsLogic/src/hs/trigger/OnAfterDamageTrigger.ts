///<reference path="../core/HsActionEvent.ts"/>
///<reference path="../core/HsGameEnv.ts"/>

"use strict";

namespace HSLogic {

    export class OnAfterDamageTrigger extends HsEventHandler {

        isRespondingTo(event: HsActionEvent<DamageParam>): boolean {
            return event.type === OnAfterDamageEvent.type;
        };

        trigger(event: HsActionEvent<DamageParam>, gameEnv: HsGameEnv): jsLogic.IAction<HsGameEnv> {
            return gameEnv.actionFactory.emptyAction(event.param.sourceAction, `${this}: action`);
        };
    }
}