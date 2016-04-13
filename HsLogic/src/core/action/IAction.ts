///<reference path="ActionCommons.ts"/>

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


        //constructor( public source: ISource ) { }


        resolvable( context: T ): boolean { return true }


        get timelimit(): number { return _5_SECONDS; }
        get className(): string { return ClassUtils.getNameOfClass( this ) }
        toString(): string { return this.className }
    }

}
