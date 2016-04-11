"use strict";

namespace Def {


    export interface AcquireTargetsParam extends HsLogic.IHsCancelableParam {
        availableTargets: Target[],
        targets: Target[]
    }

    export abstract class AcquireTargetsAction<P extends AcquireTargetsParam> extends HsLogic.Action<P> { }


    export abstract class ITargetPicker<P extends Object> {
        abstract availableTargets( context: HsGameCtx ): Target[];
        abstract isAvailibleTargetsSetValid( availableTargets: Target[], context: HsGameCtx ): boolean;
        abstract acquireTargetsAction( param: AcquireTargetsParam, context: HsGameCtx ): Action;
        abstract arePickedTargetsValid( param: AcquireTargetsParam, context: HsGameCtx ): boolean;

        constructor( public param: P ) { }
    }

    export interface IDefActionParam<P extends Object> {
        targetPickerParam: P;
    }


    export abstract class IDefAction<T extends IDefActionParam<Object>> {
        targetPicker: ITargetPicker<Object>;
        abstract actionBuilder( param: AcquireTargetsParam, context: HsGameCtx ): Action;

        constructor( public param: T ) { }
    }

}