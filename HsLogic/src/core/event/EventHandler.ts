"use strict";

namespace jsLogic {

    export const DEFAULT_TRIGGER_LEVEL = 100;
    export const QUEUE_TRIGGER_FIRST = 0;
    export const QUEUE_TRIGGER_LAST = 200;


    export abstract class EventHandler {
        // triggers will trigger in order from the lowest level to the higest
        // triggers with equals level: trigger registered first will trigger first
        // queue_level has to be a positive number
        queue_level: number = DEFAULT_TRIGGER_LEVEL;

        abstract isRespondingTo(event: ActionEvent<IActionParam>): boolean;

        abstract trigger(event: ActionEvent<IActionParam>): IAction<IActionParam>;

        toString(): string {
            return ClassUtils.getNameOfClass(this);
        }
    }

}