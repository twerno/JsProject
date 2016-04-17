"use strict";

namespace Def {

    export interface IDefAction {
        targets: IDefTargetDefinition<Object>;
        actionBuilder( source: ISource, targets: Permanent[], gameCtx: HsGameCtx ): Action[];
    }

}