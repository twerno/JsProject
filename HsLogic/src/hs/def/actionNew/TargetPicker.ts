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


    export enum PICK_MODE {
        RANDOM, USER_CHOICE
    }

    export interface TargetPickerParam {
        availableTargetsSetBuilder: ITargetSetBuilder,
        numberOfAvailibleTargetsRequired: number,
        numberOfTargets: number,
        pickMode: PICK_MODE
    }

    //export enum AVAILABLE_TARGETS {
    //    ENEMY_HERO,
    //    EMEMY_MINION,
    //    ENEMY_CHARACTER,
    //    EMENY_WEAPON,
    //    FRIENDLY_HERO,
    //    FRIENDLY_MINION,
    //    FRIENDLY_CHARACTER,
    //    FRIENDLY_WEAPON,
    //    ANY_MINION,
    //    ANY_CHARACTER
    //}

    export interface SimpleTargetPickerParam {
        availableTargets: ITargetSetBuilder,
        numberOfAvailibleTargetsToBePlayable: number,
        numberOfTargets: number,
        pickMode: PICK_MODE
    }


    export class SimpleTargetPicker extends ITargetPicker<SimpleTargetPickerParam> {

        availableTargets( source: ISource, context: HsGameCtx ): Target[] {
            return this.param.availableTargets.buildSet<Target>( source, context );
        }


        isAvailibleTargetsSetValid( availableTargets: Target[], context: HsGameCtx ): boolean {
            return availableTargets.length >= ( this.param.numberOfAvailibleTargetsToBePlayable || 0 );
        }


        acquireTargetsAction( param: AcquireTargetsActionParam, context: HsGameCtx ): Action {
            if ( this.param.pickMode === PICK_MODE.RANDOM )
                return context.actionFactory.makeAChoice.singleTarget( param );
            else
                return context.actionFactory.makeAChoice.singleTarget( param );
        }


        arePickedTargetsValid( availableTargets: Target[], picked: Target[], context: HsGameCtx ): boolean {
            return ( this.param.numberOfAvailibleTargetsToBePlayable === 0 && ( picked.length in [0, this.param.numberOfTargets] ) )
                || picked.length === this.param.numberOfAvailibleTargetsToBePlayable;
        }
    }

    export class OPTIONAL_TARGET {

        static get SINGLE_FRIENDLY_MINION(): SimpleTargetPicker {
            return new SimpleTargetPicker( {
                availableTargets: TargetFinder.FRIENDLY_MINION,
                numberOfAvailibleTargetsToBePlayable: 0,
                numberOfTargets: 1,
                pickMode: PICK_MODE.USER_CHOICE
            });
        }

    }


    export class TARGET {

        static get SINGLE_CHARACTER(): SimpleTargetPicker {
            return new SimpleTargetPicker( {
                availableTargets: TargetFinder.ANY_CHARACTER,
                numberOfAvailibleTargetsToBePlayable: 1,
                numberOfTargets: 1,
                pickMode: PICK_MODE.USER_CHOICE
            });
        }

    }

}