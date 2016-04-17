/// <reference path="action.ts" />
///<reference path="../../core/action/IAction.ts"/>

"use strict";

namespace HsLogic {

    export interface ActionEventClass {
        new ( param: IActionParam ): ActionEvent<IActionParam>;
    }

    export abstract class ActionEvent<P extends IActionParam> {
        get type(): string { return ClassUtils.getNameOfClass( this ) }

        valid( gameCtx: HsGameCtx ): boolean { return true }

        dispatch( gameCtx: HsGameCtx ): ActionType {
            return new DispatchEvent( this );
        }

        dispatchOrSave( gameCtx: HsGameCtx, check: () => boolean ): ActionType {
            let param: P = this.param,
                self: ActionEvent<P> = this;

            return new InlineAction(( resolve, reject ): void => {
                if ( check && check() )
                    resolve( new DispatchEvent( self ) );
                else {
                    gameCtx.eventMgr.save( self );
                    resolve( jsAction.NO_CONSEQUENCES );
                }
            });
        }

        constructor( public param: P ) {
            if ( isHsCancelableParam( param )
                && !( this instanceof CancelableEvent ) )
                console.error( 'Use CancelableEvent class for IHsCancelableParam.' );
        }
    };

    export abstract class CancelableEvent<P extends IHsCancelableParam> extends ActionEvent<P> {

        valid( gameCtx: HsGameCtx ): boolean {
            return this.param.cancelAction.value;
        }
    }
}