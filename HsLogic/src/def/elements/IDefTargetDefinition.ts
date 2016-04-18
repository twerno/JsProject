/// <reference path="../../hs/core/action.ts" />

"use strict";

namespace Def {

    export abstract class IDefTargetDefinition<P extends Object> {
        abstract availableTargets( source: ISource, gameCtx: HsGameCtx ): Permanent[];
        abstract isAvailibleTargetsSetValid( availableTargets: Permanent[], gameCtx: HsGameCtx ): boolean;
        abstract acquireTargetsAction( param: HsLogic.AcquireTargetsActionParam, gameCtx: HsGameCtx ): Action;
        abstract arePickedTargetsValid( availableTargets: Permanent[], picked: Permanent[], gameCtx: HsGameCtx ): boolean;

        constructor( public param: P ) { }
    }

}