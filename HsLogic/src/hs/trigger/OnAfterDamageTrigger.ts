///<reference path="../core/HsActionEvent.ts"/>
///<reference path="../core/HsgameCtx.ts"/>

"use strict";

namespace HSLogic {

    export class OnAfterDamageTrigger extends HsEventHandler {

        isRespondingTo(event: HsActionEvent<DamageParam>): boolean {
            return event.type === OnAfterDamageEvent.type;
        };

        trigger(event: HsActionEvent<DamageParam>, gameCtx: HsGameCtx): jsLogic.IAction<HsGameCtx> {
            return gameCtx.actionFactory.emptyAction(event.param.sourceAction, `${this}: action`);
        };
    }
}