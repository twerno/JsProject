"use strict";

namespace jsLogic {

    export class Counter {

        type: string;

        toString(): string {
            return ClassUtils.getNameOfClass(this);
        }

        constructor(public value: number) {
            this.type = ClassUtils.getNameOfClass(this);
        };
    }


    export interface CounterMap extends Collection.IStringMap<Counter> { };

}