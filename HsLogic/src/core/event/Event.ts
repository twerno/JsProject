///<reference path="EventHandlers.ts"/>

"use strict";

namespace jsLogic {

    export class ActionEvent<T extends IContext, P extends IActionParam<T>> {

        type: string = ClassUtils.getNameOfClass(this);

        constructor(public param: P) { }
    }

    export type EventBuilder<T extends IContext, P extends IActionParam<T>> = (param: P) => ActionEvent<T, P>;
}