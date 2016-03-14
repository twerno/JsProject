"use strict";

namespace HSLogic {

    export type FActionsBuilder<T extends HsEntity, P extends ChooseActionParam<T>> = ( param: P, gameCtx: HsGameCtx ) => jsLogic.IAction<HsGameCtx>[];

    export interface ITargetedTriggerDef<T extends HsEntity, P extends ChooseActionParam<T>> {
        availableTargets: IDefTargetSetBuilder<T>,
        //acquireTargetsParam: (source: IHsSource, gameCtx: T, props: A) => IAcquireTargetsParam,
        makeAChoice: FChooseActionBuilder<T, P>,
        validateChoosen: ( param: P, gameCtx: HsGameCtx ) => boolean,
        actions: FActionsBuilder<T, P>,
    }

    export type ITargetlessTriggerDef = ( source: IHsSource, gameCtx: HsGameCtx ) => jsLogic.IAction<HsGameCtx>[];

    export type ITriggerDef = ITargetedTriggerDef<HsEntity, ChooseActionParam<HsEntity>> | ITargetlessTriggerDef;
    export type ICardActionDefs = ITriggerDef[];


    export function isTargetedTriggerDef( cardActionDef: any ): cardActionDef is ITargetedTriggerDef<HsEntity, ChooseActionParam<HsEntity>> {
        return cardActionDef instanceof Object
            && cardActionDef.hasOwnProperty( 'availableTargets' )
            && cardActionDef.hasOwnProperty( 'makeAChoice' )
            && cardActionDef.hasOwnProperty( 'validateChoosen' )
            //&& cardActionDef.hasOwnProperty('acquireTargetsParam')
            && cardActionDef.hasOwnProperty( 'actions' );
    }

    //var test: ICardActionDefs;
    //isTargetedCardActionDef(test[0]) && test[0]

    export function isTargetlessTriggerDef( cardActionDef: any ): cardActionDef is ITargetlessTriggerDef {
        return cardActionDef instanceof Function;
        //&& !cardActionDef.hasOwnProperty( 'availableTargets' )
        //&& !cardActionDef.hasOwnProperty( 'makeAChoice' )
        //&& !cardActionDef.hasOwnProperty( 'validateChoosen' )
        //&& cardActionDef.hasOwnProperty( 'actions' );
    }

    //export type ICardActionDefs<T extends HsGameCtx, P extends ChooseActionParam> = ICardActionDef<T, P> | ICardActionDef<T, P>[];
    //export type ICardActionDefs = ICardActionDef<HsGameCtx, ChooseActionParam> | ICardActionDef<HsGameCtx, ChooseActionParam>[];


    //export type IDefActionFactory = IActionFactory<HsGameCtx, HsActionParam> | IActionFactory<HsGameCtx, HsActionParam>[];
    //export type IDefTargetedActionFactory = ITargetedActionFactory<HsGameCtx, ParamWithTargetFilter> | ITargetedActionFactory<HsGameCtx, ParamWithTargetFilter>[];

    //export interface IDefAction {
    //    actions: IDefActionFactory
    //}

    //export class DefAction {
    //    constructor(public actionBuilder: IDefActionFactory) { }
    //}



    //export interface IDefTargetedAction {
    //    altTargets: DefProperTarget,
    //    actions: IDefTargetedActionFactory
    //}

    //export class DefTargetedAction {
    //    constructor(public altTargets: DefProperTarget, public actionBuilder: IDefTargetedActionFactory) { }
    //}



    //export type IDefActions = DefAction | DefAction[] | DefTargetedAction | DefTargetedAction[];



    //export function DEF_ACTION(def: IDefAction): DefAction {
    //    return new DefAction(def.actions);
    //}

    //export function DEF_TARGETED_ACTION(def: IDefTargetedAction): DefTargetedAction {
    //    return new DefTargetedAction(def.altTargets, def.actions);
    //}
}