"use strict";

namespace Def.Filters {

    export function OtherThan( otherThan: HsLogic.HsEntity ): IDefSetFilter<Entity> {
        return ( source: ISource, entity: HsLogic.HsEntity, context: HsGameCtx ): boolean => {
            return otherThan !== entity;
        }
    }
}