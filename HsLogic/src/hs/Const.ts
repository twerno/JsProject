"use strict";

namespace HsLogic {

    export type Character = Player | Minion;

    export enum REQUIRE {
        YES,
        NO,
        IF_TARGETS_ARE_AVAILABLE
    }

}