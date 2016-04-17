/// <reference path="../../hs/core/action.ts" />

"use strict";

namespace Def {

    export interface AcquireTargetsActionParam extends HsLogic.IHsCancelableParam {
        availableTargets: Permanent[],
        targets: Permanent[]
    }

    //export abstract class AcquireTargetsAction<P extends AcquireTargetsActionParam> extends HsLogic.Action<P> { }


    export abstract class IDefTargetDefinition<P extends Object> {
        abstract availableTargets( source: ISource, gameCtx: HsGameCtx ): Permanent[];
        abstract isAvailibleTargetsSetValid( availableTargets: Permanent[], gameCtx: HsGameCtx ): boolean;
        abstract acquireTargetsAction( param: AcquireTargetsActionParam, gameCtx: HsGameCtx ): Action;
        abstract arePickedTargetsValid( availableTargets: Permanent[], picked: Permanent[], gameCtx: HsGameCtx ): boolean;

        constructor( public param: P ) { }
    }

}