"use strict";

namespace HSLogic {

    export type FActionBuilder<T extends HsGameCtx, P extends ChooseActionParam> = ( param: P, gameCtx: T ) => jsLogic.IAction<T>;

    export interface ITargetedCardActionDef<T extends HsGameCtx, P extends ChooseActionParam> {
        availableTargets: IDefTargetSetBuilder,
        //acquireTargetsParam: (source: IHsSource, gameCtx: T, props: A) => IAcquireTargetsParam,
        makeAChoice: FChooseActionBuilder<T, P>,
        validateChoosen: ( param: P, gameCtx: T ) => boolean,
        actionBuilder: FActionBuilder<T, P>,
    }

    export interface ITargetlessActionDef<T extends HsGameCtx> {
        actionBuilder: ( source: IHsSource, gameCtx: T ) => jsLogic.IAction<T>
    }

    export type ICardActionDef = ITargetedCardActionDef<HsGameCtx, ChooseActionParam> | ITargetlessActionDef<HsGameCtx>;
    export type ICardActionDefs = ICardActionDef[];


    export function isTargetedCardActionDef( cardActionDef: any ): cardActionDef is ITargetedCardActionDef<HsGameCtx, ChooseActionParam> {
        return cardActionDef
            && cardActionDef instanceof Object
            && cardActionDef.hasOwnProperty( 'sourceSetBuilder' )
            && cardActionDef.hasOwnProperty( 'chooseTargetActionBuilder' )
            && cardActionDef.hasOwnProperty( 'validateChoosenTargets' )
            //&& cardActionDef.hasOwnProperty('acquireTargetsParam')
            && cardActionDef.hasOwnProperty( 'actionBuilder' );
    }

    //var test: ICardActionDefs;
    //isTargetedCardActionDef(test[0]) && test[0]

    export function isTargetlessCardActionDef( cardActionDef: any ): cardActionDef is ITargetlessActionDef<HsGameCtx> {
        return cardActionDef
            && cardActionDef instanceof Object
            && !cardActionDef.hasOwnProperty( 'sourceSetBuilder' )
            && !cardActionDef.hasOwnProperty( 'chooseTargetActionBuilder' )
            && !cardActionDef.hasOwnProperty( 'validateChoosenTargets' )
            && cardActionDef.hasOwnProperty( 'actionBuilder' );
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