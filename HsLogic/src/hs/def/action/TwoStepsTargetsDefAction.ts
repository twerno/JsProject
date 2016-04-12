//"use strict";
//
//namespace Def {
//
//    export interface IStep2TargetsDefActionParam<T extends HsLogic.HsEntity> {
//        availableTargets: ( step1Target: T ) => IDefSetBuilder,
//        actionBuilder: FTargetsActionBuilder<T>
//    }
//
//    export interface ITwoStepsAllTargetsDefActionParam<T extends HsLogic.HsEntity> {
//        step1: ISingleTargetParam<T>,
//        step2: IStep2TargetsDefActionParam<T>
//    }
//
//
//    export class TwoStepsTargetsDefAction<T extends HsLogic.HsEntity> extends SingleTargetDefAction<T> {
//
//        actions( source: ISource, targets: ITargets, context: HsGameCtx ): Action[] {
//            let result: Action[] = super.actions( source, targets, context ),
//                step1Target: T = this.getSingleTarget( targets );
//
//
//            if ( step1Target !== null ) {
//                let step2Targets: T[] = <T[]>this.twoStepParam.step2.availableTargets( step1Target ).buildSet( source, context );
//                result.concat( this.twoStepParam.step2.actionBuilder( source, step2Targets, context ) );
//            }
//
//            return result;
//        }
//
//        constructor( public twoStepParam: ITwoStepsAllTargetsDefActionParam<T> ) {
//            super( twoStepParam.step1 )
//        }
//    }
//}