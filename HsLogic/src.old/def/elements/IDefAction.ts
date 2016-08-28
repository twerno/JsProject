"use strict";

namespace Def {

    export interface IDefAction {

        targets: IDefTargetDefinition<Object>;

        executable?( source: ISource, targets: Permanent[], gameCtx: HsGameCtx ): boolean;

        actionBuilder( source: ISource, targets: Permanent[], gameCtx: HsGameCtx ): Action[];
    }

}