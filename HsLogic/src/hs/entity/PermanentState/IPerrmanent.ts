"use strict";

namespace HsLogic {

    export interface IPermanent<T extends Permanent> {
        states: PermanentState<T, any>[];
    }

}