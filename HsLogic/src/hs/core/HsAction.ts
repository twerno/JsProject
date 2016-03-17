///<reference path="../../core/action/IAction.ts"/>
///<reference path="../../core/action/IAction.ts"/>
///<reference path="HsGameContext.ts"/>
///<reference path="../../core/action/IActionContext.ts"/>


"use strict";

namespace HsLogic {

    export type PromiseOfActions = Promise<jsLogic.IAction<HsGameCtx>[]>;

    export enum SOURCE_TYPE {
        MINION,
        SPELL,
        HERO_POWER,
        HERO,
        NONE
    }

    export interface IHsSource extends jsLogic.ISource {
        card: Card,
        caster: Player,
        sourceType: SOURCE_TYPE
    }

    export interface IHsActionParam extends jsLogic.IActionParam {
        source: IHsSource
    }

    export interface IHsCancelableParam extends IHsActionParam {
        cancelAction: { value: boolean }
    }

    export abstract class HsAction<P extends IHsActionParam> extends jsLogic.IAction<HsGameCtx> {

        constructor( public param: P ) { super( param.source.action ) }

        abstract resolve( _this_: jsLogic.IAction<HsGameCtx>, gameCtx: HsGameCtx ): PromiseOfActions;

        protected dispatch( event: HsActionEvent<IHsActionParam>, gameCtx: HsGameCtx ): jsLogic.IAction<HsGameCtx> {
            return gameCtx.actionFactory.dispatch( event );
        }
    }

    export abstract class HsActionEvent<P extends IHsActionParam> extends jsLogic.ActionEvent<HsGameCtx, P> { };

    export type FActionBuilder<P extends IHsActionParam> = ( param: P, gameCtx: HsGameCtx ) => HsAction<P>;

    export class InlineAction extends jsLogic.InlineAction<HsGameCtx> { };
}