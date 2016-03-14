"use strict";

namespace Def {

    export interface ITriggers {
        onDrawn?: IDefTargetlessAction[]
    }

    export interface IPermanentTriggers extends ITriggers {
        battlecry?: IDefAction[],
        deathrattle?: IDefTargetlessAction[]
    }
}