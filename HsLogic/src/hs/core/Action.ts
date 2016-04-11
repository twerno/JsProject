///<reference path="../../core/action/IAction.ts"/>

"use strict";

namespace HsLogic {

    export type ActionType = jsLogic.IAction<HsGameCtx>;
    export type PromiseOfActions = Promise<ActionType | ActionType[]>;
    export type FActionBuilder<P extends IActionParam> = ( param: P, context: HsGameCtx ) => Action<P>;
    export class InlineAction extends jsLogic.InlineAction<HsGameCtx> { };
    export class InlineActionExt extends jsLogic.InlineActionExt<HsGameCtx> { };


    export enum SOURCE_TYPE {
        MINION,
        SPELL,
        HERO_POWER,
        HERO,
        NONE
    }

    export interface ISource extends jsLogic.ISource {
        caster: Player,
        sourceType: SOURCE_TYPE,
        sourceCard: Card
    }


    export interface IActionParam extends jsLogic.IActionParam {
        source: ISource
    }


    export function isHsCancelableParam( param: any ): param is IHsCancelableParam {
        return param.hasOwnProperty( 'source' )
            && param.hasOwnProperty( 'cancelAction' )
            && param.cancelAction.hasOwnProperty( 'value' );
    }


    export interface IHsCancelableParam extends IActionParam {
        cancelAction: { value: boolean }
    }


    export abstract class Action<P extends IActionParam> extends jsLogic.IAction<HsGameCtx> {

        constructor( public param: P ) { super() }

        abstract resolve( self: Action<P>, context: HsGameCtx ): PromiseOfActions;
    }

}