///<reference path="EventHandlers.ts"/>

"use strict";

namespace jsLogic {

    export class ActionEvent<T extends IActionParam> {

        eventName: string = Utils.getNameOfClass(this);

        constructor(public source: IAction<T>) {
        }
    }
}