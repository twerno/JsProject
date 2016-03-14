"use strict";

namespace HSLogic {

    export interface ITriggers {
        onDrawn?: ITargetlessTriggerDef[]
    }

    export interface IPermanentsTriggers extends ITriggers {
        battlecry?: ICardActionDefs,
        deathrattle?: ITargetlessTriggerDef[]
    }
}