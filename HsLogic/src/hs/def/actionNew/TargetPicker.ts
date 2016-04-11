"use strict";

namespace Def {


    //export interface AcquireTargetsParam extends HsLogic.IHsCancelableParam {
    //    availableTargets: Target[],
    //    targets: Target[]
    //}

    //export abstract class AcquireTargetsAction<P extends AcquireTargetsParam> extends HsLogic.Action<P> { }


    //export abstract class ITargetPicker<P extends Object> {
    //    abstract availableTargets( context: HsGameCtx ): Target[];
    //    abstract isAvailibleTargetsSetValid( availableTargets: Target[], context: HsGameCtx ): boolean;
    //    abstract acquireTargetsAction( param: AcquireTargetsParam, context: HsGameCtx ): AcquireTargetsAction<AcquireTargetsParam>;
    //    abstract arePickedTargetsValid( param: AcquireTargetsParam, context: HsGameCtx ): boolean;

    //    constructor( public param: P ) { }
    //}


    export interface TargetPickerParam {
        availableTargetsSetBuilder: IDefSetBuilder,
        numberOfAvailibleTargetsRequired: number,
        numberOfTargets: number
    }


    export class SingleTargetPicker extends ITargetPicker<TargetPickerParam> {

        availableTargets( context: HsGameCtx ): Target[] {
            return <Target[]>this.param.availableTargetsSetBuilder.buildSet( null, context );
        }


        isAvailibleTargetsSetValid( availableTargets: Target[], context: HsGameCtx ): boolean {
            return availableTargets.length >= ( this.param.numberOfAvailibleTargetsRequired || 0 );
        }


        acquireTargetsAction( param: AcquireTargetsParam, context: HsGameCtx ): Action {
            return context.actionFactory.makeAChoice.singleTarget( param );
        }


        arePickedTargetsValid( param: AcquireTargetsParam, context: HsGameCtx ): boolean {
            return ( this.param.numberOfAvailibleTargetsRequired === 0 && ( param.targets.length in [0, this.param.numberOfTargets] ) )
                || param.targets.length === this.param.numberOfAvailibleTargetsRequired;
        }
    }

}