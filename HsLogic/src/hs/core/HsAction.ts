///<reference path="../../core/action/IAction.ts"/>
///<reference path="HsGameContext.ts"/>

"use strict";

namespace HsLogic {

    export type PromiseOfActions = Promise<jsLogic.IAction<HsGameCtx> | jsLogic.IAction<HsGameCtx>[]>;

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

    export interface IHsCancelableParam extends IActionParam {
        cancelAction: { value: boolean }
    }

    export abstract class Action<P extends IActionParam> extends jsLogic.IAction<HsGameCtx> {

        constructor( public param: P ) { super( param.source ) }

        abstract resolve( self: jsLogic.IAction<HsGameCtx>, gameCtx: HsGameCtx ): PromiseOfActions;
    }


    export interface ActionEventClass {
        new ( param: IActionParam ): ActionEvent<IActionParam>;
    }

    export abstract class ActionEvent<P extends IActionParam> {
        get type(): string { return ClassUtils.getNameOfClass( this ) }

        valid( gameCtx: HsGameCtx ): boolean { return true }

        constructor( public param: P ) { }
    };

    export type FActionBuilder<P extends IActionParam> = ( param: P, gameCtx: HsGameCtx ) => Action<P>;

    export class InlineAction extends jsLogic.InlineAction<HsGameCtx> { };
    export class InlineActionExt extends jsLogic.InlineActionExt<HsGameCtx> { };
}