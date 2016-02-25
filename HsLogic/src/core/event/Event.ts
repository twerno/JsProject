///<reference path="EventHandlers.ts"/>

"use strict";

namespace jsLogic {

    export class IEventParam<T extends IHasHandlersAndBuilder> {
        sourceAction: IAction<T>
    }



    export abstract class ActionEvent<T extends IHasHandlersAndBuilder, P extends IEventParam<T>> {

        type: string = ClassUtils.getNameOfClass(this);

        constructor(public param: P) { }
    }
}