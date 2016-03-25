///<reference path="ActionConsts.ts"/>

"use strict";

namespace jsLogic {

	/**
     *  IAction<T>
     * 
     */
    export abstract class IAction<T extends IContext> {


        // actions in natural order
        // first on results list are first to resolve
        abstract resolve( self: IActionType, context: T ): Promise<IAction<IContext> | IAction<IContext>[]>;


        constructor( public source: ISource ) { }


        resolvable( context: T ): boolean { return true }


        get timelimit(): number { return _5_SECONDS; }
        get className(): string { return ClassUtils.getNameOfClass( this ) }
        toString(): string { return this.className }
    }



    export class InlineAction<T extends IContext> extends IAction<T> {

        resolve( self: InlineAction<T>, context: T ): Promise<IAction<IContext> | IAction<IContext>[]> {
            return new Promise<IActionType | IActionType[]>( this.executor );
        }


        constructor( protected executor: FPromiseExecutor<IActionType | IActionType[]> ) {
            super( null );
        }
    }


    export class InlineActionExt<T extends IContext> extends InlineAction<T> {

        resolvable( context: T ): boolean {
            if ( this.resolvableCheck )
                return this.resolvableCheck( context )
            else
                return super.resolvable( context );
        }

        constructor( protected resolvableCheck: ( context: T ) => boolean, executor: FPromiseExecutor<IActionType | IActionType[]> ) {
            super( executor );
        }
    }

}