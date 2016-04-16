"use strict";

namespace Def {

    export interface IDefAction {
        targets: IDefTargetDefinition<Object>;
        actionBuilder( source: ISource, targets: Permanent[], context: HsGameCtx ): Action[];
    }

}