"use strict";

namespace jsLogic {

    export const DEFAULT_TRIGGER_LEVEL = 100;
    export const QUEUE_TRIGGER_FIRST = 0;
    export const QUEUE_TRIGGER_LAST = 200;
    export const UI_LISTENER = QUEUE_TRIGGER_LAST + 1;


    export abstract class EventHandler<T extends IActionContext, P extends IActionParam<T>> {
        // triggers will trigger in order from the lowest level to the higest
        // triggers with equals level: trigger registered first will trigger first
        // queue_level has to be a positive number
        queue_level: number = DEFAULT_TRIGGER_LEVEL;

        abstract isRespondingTo(event: ActionEvent<T, P>): boolean;

        abstract trigger(event: ActionEvent<T, P>, param: T): IAction<T>;

        toString(): string {
            return ClassUtils.getNameOfClass(this);
        }
    }

}