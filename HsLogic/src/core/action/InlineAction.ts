/// <reference path="iAction.ts" />

"use strict";

namespace jsAction {


    /**
     *  InlineAction<Icontext>
     * 
     */
    export class InlineAction<T extends IContext> extends IAction<T> {

        resolve( self: InlineAction<T>, context: T ): Promise<IAction<IContext> | IAction<IContext>[]> {
            return new Promise<IActionType | IActionType[]>( this.executor );
        }


        constructor( protected executor: CommonUtils.PromiseWorker<IActionType | IActionType[]> ) { super() }
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


        constructor( protected resolvableCheck: () => boolean, executor: CommonUtils.PromiseWorker<IActionType | IActionType[]> ) {
            super( executor );
        }
    }

}
