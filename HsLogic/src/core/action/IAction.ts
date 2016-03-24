"use strict";

namespace jsLogic {

	/**
     *  IAction<T>
     * 
     */
    export abstract class IAction<T extends IContext> {


        // actions in natural order
        // first on results list are first to resolve
        abstract resolve( self: IActionType, context: T ): PromiseOfActions;


        constructor( public source: ISource ) { }


        resolvable( self: jsLogic.IAction<T>, gameCtx: T ): boolean { return true }


        get timelimit(): number { return _5_SECONDS; }
        get className(): string { return ClassUtils.getNameOfClass( this ) }
        toString(): string { return this.className }
    }



    export class InlineAction<T extends IContext> extends IAction<T> {

        resolve( self: IActionType, context: T ): PromiseOfActions {
            return new Promise<IAction<T>[]>( this.executor );
        }

        constructor( protected executor: FPromiseExecutor<IAction<T>[]> ) {
            super( null );
        }
    }

}