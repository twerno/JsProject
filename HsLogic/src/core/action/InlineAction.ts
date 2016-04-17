/// <reference path="iAction.ts" />

"use strict";

namespace jsAction {

    export type FPromiseExecutor<T> = ( resolve: ( value?: T | PromiseLike<T> ) => void, reject: ( reason?: any ) => void ) => void;


    /**
     *  InlineAction<Icontext>
     * 
     */
    export class InlineAction<T extends IContext> extends IAction<T> {

        resolve( self: InlineAction<T>, context: T ): Promise<IAction<IContext> | IAction<IContext>[]> {
            return new Promise<IActionType | IActionType[]>( this.executor );
        }


        constructor( protected executor: FPromiseExecutor<IActionType | IActionType[]> ) { super() }
    }


    /**
     *  InlineActionExt<Icontext>
     * 
     */
    export class InlineActionExt<T extends IContext> extends InlineAction<T> {

        resolvable( context: T ): boolean {
            if ( this.resolvableCheck )
                return this.resolvableCheck()
            else
                return super.resolvable( context );
        }


        constructor( protected resolvableCheck: () => boolean, executor: FPromiseExecutor<IActionType | IActionType[]> ) {
            super( executor );
        }
    }

}
