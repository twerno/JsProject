"use strict";

namespace HsLogic {

    var _entityIdGenerator: number = 0;

    /**
     *  generateNewId
     *
     */
    export function generateNewId(): string {
        return ( ++_entityIdGenerator ).toString();
    }

}