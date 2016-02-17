"use strict";

namespace jsLogic {

    export class Counter {

        type: string;

        toString(): string {
            return Utils.getNameOfClass(this);
        }

        constructor(public value: number) {
            this.type = Utils.getNameOfClass(this);
        };
    }


    export interface CounterMap extends Collection.IStringMap<Counter> { };

}