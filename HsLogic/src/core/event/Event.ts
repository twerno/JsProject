///<reference path="EventHandlers.ts"/>

"use strict";

namespace jsLogic {

    export class ActionEvent<T extends IHasHandlersAndBuilder> {

        type: string = ClassUtils.getNameOfClass(this);

        constructor(public source: IAction<T>) {
        }
    }
}