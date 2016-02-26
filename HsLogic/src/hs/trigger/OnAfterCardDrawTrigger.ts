///<reference path="../../core/event/EventHandler.ts"/>
///<reference path="../core/HsActionParam.ts"/>
///<reference path="../HsActions/DrawCard.ts"/>

"use strict";

namespace HSLogic {

    export class OnAfterCardDrawTrigger extends HsEventHandler {

        isRespondingTo(event: HsActionEvent<DrawParam>): boolean {
            return event.type === OnAfterDrawEvent.type;
        };

        trigger(event: HsActionEvent<DrawParam>): jsLogic.IAction<HsActionParam> {
            return new EmptyAction(event.param.sourceAction, `${this}: action`);
        };
    }
}