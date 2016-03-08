///<reference path="EventHandlers.ts"/>

"use strict";

namespace jsLogic {

    export class IActionParam<T extends IActionContext> {
        sourceAction: IAction<T>
    }



    export class ActionEvent<T extends IActionContext, P extends IActionParam<T>> {

        constructor(public eventName: string, public param: P) { }

        static onBeforeEventName(eventName: string): string {
            return 'onBefore' + eventName;
        }

        static onAfterEventName(eventName: string): string {
            return 'onAfter' + eventName;
        }
    }
}