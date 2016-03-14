///<reference path="../../core/action/IAction.ts"/>
///<reference path="../../core/action/IAction.ts"/>
///<reference path="HsGameContext.ts"/>
///<reference path="../../core/action/IActionContext.ts"/>


"use strict";

namespace HSLogic {

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
        caller: Player,
        sourceType: SOURCE_TYPE
    }

    export interface IHsActionParam extends jsLogic.IActionParam {
        source: IHsSource
    }

    export abstract class HsAction<P extends IHsActionParam> extends jsLogic.IAction<HsGameCtx> {

        constructor( public param: P ) { super( param.source.action ) }

        abstract resolve( _this_: jsLogic.IAction<HsGameCtx>, gameCtx: HsGameCtx ): PromiseOfActions;
    }

    export abstract class HsActionEvent<P extends IHsActionParam> extends jsLogic.ActionEvent<HsGameCtx, P> { };

}