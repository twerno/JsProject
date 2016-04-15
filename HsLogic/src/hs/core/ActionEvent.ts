/// <reference path="action.ts" />
///<reference path="../../core/action/IAction.ts"/>

"use strict";

namespace HsLogic {

    export interface ActionEventClass {
        new ( param: IActionParam ): ActionEvent<IActionParam>;
    }

    export abstract class ActionEvent<P extends IActionParam> {
        get type(): string { return ClassUtils.getNameOfClass( this ) }

        valid( context: HsGameCtx ): boolean { return true }

        dispatch( context: HsGameCtx ): ActionType {
            return new DispatchEvent( this );
        }

        dispatchOrSave( context: HsGameCtx, check: () => boolean ): ActionType {
            let param: P = this.param,
                self: ActionEvent<P> = this;

            return new InlineAction(( resolve, reject ): void => {
                if ( check && check() )
                    resolve( new DispatchEvent( self ) );
                else {
                    context.eventMgr.save( self );
                    resolve( jsLogic.NO_CONSEQUENCES );
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

        valid( context: HsGameCtx ): boolean {
            return this.param.cancelAction.value;
        }
    }
}