/// <reference path="../../core/action/inlineaction.ts" />
///<reference path="../../core/action/IAction.ts"/>

"use strict";

namespace HsLogic {

    export type ActionType = jsAction.IAction<HsGameCtx>;
    export type PromiseOfActions = Promise<ActionType | ActionType[]>;
    export type FActionBuilder<P extends IActionParam> = ( param: P, gameCtx: HsGameCtx ) => Action<P>;
    export class InlineAction extends jsAction.InlineAction<HsGameCtx> { };
    export class InlineActionExt extends jsAction.InlineActionExt<HsGameCtx> { };


    export interface ISource {
        player: Player,
        sourceCardDef: Object,
        sourceType: SOURCE_TYPE,
        //entity: Entity
    }


    export function isActionParam( param: any ): param is IActionParam {
        return param
            && param.hasOwnProperty( 'source' )
            && param['source'].hasOwnProperty( 'player' )
            && param['source'].hasOwnProperty( 'sourceType' )
            && param['source'].hasOwnProperty( 'entity' );
    }

    export interface IActionParam {
        source: ISource
    }


    export function isHsCancelableParam( param: any ): param is IHsCancelableParam {
        return isActionParam( param )
            && param.hasOwnProperty( 'cancelAction' )
            && param.cancelAction.hasOwnProperty( 'value' );
    }


    export interface IHsCancelableParam extends IActionParam {
        cancelAction: { value: boolean }
    }


    export abstract class Action<P extends IActionParam> extends jsAction.IAction<HsGameCtx> {

        constructor( public param: P ) {
            super();

            //if ( isHsCancelableParam( param )
            //    && !( this instanceof CancelableAction ) )
            //    console.error( `${ClassUtils.getNameOfClass( this )} is not a CancelableAction class.` );
        }

        abstract resolve( self: Action<P>, gameCtx: HsGameCtx ): PromiseOfActions;

        static build<P extends IActionParam>( param: P ): jsAction.IAction<HsGameCtx> {
            throw new Error( 'Not implemented yet' )
        }
    }


    export abstract class CancelableAction<P extends IHsCancelableParam> extends Action<P> {

        resolvable( context: HsGameCtx ): boolean {
            return !this.param.cancelAction.value
        }
    }

}