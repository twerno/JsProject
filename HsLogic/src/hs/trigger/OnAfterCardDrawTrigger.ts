///<reference path="../../core/event/EventHandler.ts"/>
///<reference path="../HsActionParam.ts"/>
///<reference path="../HsActions/DrawCard.ts"/>

"use strict";

namespace HSLogic {

    export class OnAfterCardDrawTrigger extends jsLogic.EventHandler {

        isRespondingTo(event: HsActionEvent): boolean {
            return event.type === OnAfterDrawCardEvent.type;
        };

        trigger(event: HsActionEvent): jsLogic.IAction<HsActionParam> {
            return new EmptyAction(`${this}: action`);
        };
    }
}