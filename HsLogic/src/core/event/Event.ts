///<reference path="EventHandlers.ts"/>

"use strict";

namespace jsLogic {

    export class IEventParam<T extends IHasHandlersAndFactory> {
        sourceAction: IAction<T>
    }



    export abstract class ActionEvent<T extends IHasHandlersAndFactory, P extends IEventParam<T>> {

        type: string = ClassUtils.getNameOfClass(this);

        constructor(public param: P) { }
    }
}