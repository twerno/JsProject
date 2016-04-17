"use strict";

namespace jsAction {

    export type IActionType = IAction<IContext>;
    export type PromiseOfActions = Promise<IActionType | IActionType[]>;

    export interface IContext { }

    export const NO_CONSEQUENCES: any = null;

    export const UNLIMITED: number = 0;
    export const _30_SECONDS: number = 30 * 1000;
    export const _10_SECONDS: number = 10 * 1000;
    export const _5_SECONDS: number = 5 * 1000;


	/**
     *  IAction<T>
     * 
     */
    export abstract class IAction<T extends IContext> {


        // actions in natural order
        // first on results list are first to resolve
        abstract resolve( self: IActionType, context: T ): Promise<IAction<IContext> | IAction<IContext>[]>;

        resolvable( context: T ): boolean { return true }

        get timelimit(): number { return _5_SECONDS; }
        get className(): string { return ClassUtils.getNameOfClass( this ) }
        toString(): string { return this.className }
    }

}
