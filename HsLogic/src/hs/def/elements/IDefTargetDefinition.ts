"use strict";

namespace Def {

    export interface AcquireTargetsActionParam extends HsLogic.IHsCancelableParam {
        availableTargets: Target[],
        targets: Target[]
    }

    //export abstract class AcquireTargetsAction<P extends AcquireTargetsActionParam> extends HsLogic.Action<P> { }


    export abstract class IDefTargetDefinition<P extends Object> {
        abstract availableTargets( source: ISource, context: HsGameCtx ): Target[];
        abstract isAvailibleTargetsSetValid( availableTargets: Target[], context: HsGameCtx ): boolean;
        abstract acquireTargetsAction( param: AcquireTargetsActionParam, context: HsGameCtx ): Action;
        abstract arePickedTargetsValid( availableTargets: Target[], picked: Target[], context: HsGameCtx ): boolean;

        constructor( public param: P ) { }
    }

}