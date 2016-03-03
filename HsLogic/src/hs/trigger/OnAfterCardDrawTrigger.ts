///<reference path="../core/HsActionEvent.ts"/>
///<reference path="../core/HsGameEnv.ts"/>
///<reference path="../HsActions/DrawCard.ts"/>

"use strict";

namespace HSLogic {

    export class OnAfterCardDrawTrigger extends HsEventHandler {

        isRespondingTo(event: HsActionEvent<DrawParam>): boolean {
            return event.type === OnAfterDrawEvent.type;
        };

        trigger(event: HsActionEvent<DrawParam>, gameEnv: HsGameEnv): jsLogic.IAction<HsGameEnv> {
            return gameEnv.actionFactory.emptyAction(event.param.sourceAction, `${this}: action`);
        };
    }
}