/// <reference path="../../core/action.ts" />

"use strict";

namespace Def {

    export interface AcquireTargetsActionParam extends HsLogic.IHsCancelableParam {
        availableTargets: Permanent[],
        targets: Permanent[]
    }

    //export abstract class AcquireTargetsAction<P extends AcquireTargetsActionParam> extends HsLogic.Action<P> { }


    export abstract class IDefTargetDefinition<P extends Object> {
        abstract availableTargets( source: ISource, context: HsGameCtx ): Permanent[];
        abstract isAvailibleTargetsSetValid( availableTargets: Permanent[], context: HsGameCtx ): boolean;
        abstract acquireTargetsAction( param: AcquireTargetsActionParam, context: HsGameCtx ): Action;
        abstract arePickedTargetsValid( availableTargets: Permanent[], picked: Permanent[], context: HsGameCtx ): boolean;

        constructor( public param: P ) { }
    }

}