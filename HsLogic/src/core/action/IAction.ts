"use strict";

namespace jsLogic {

    export interface IContext {
        actionFactory: ActionFactory;
    }

    export interface ISource {
        action: IAction<IContext>
    }

    export interface IActionParam {
        source: ISource
    }


    export type PromiseOfActions = Promise<IAction<IContext>[]>;
    export const NO_CONSEQUENCES: any = null;

    export const UNLIMITED: number = 0;
    export const _30_SECONDS: number = 30 * 1000;
    export const _10_SECONDS: number = 10 * 1000;
    export const _5_SECONDS: number = 5 * 1000;
    export type FPromiseExecutor<T> = ( resolve: ( value?: T | PromiseLike<T> ) => void, reject: ( reason?: any ) => void ) => void;


	/**
     *  IAction<T>
     * 
     */
    export abstract class IAction<T extends IContext> {

        get className(): string { return ClassUtils.getNameOfClass( this ) }

        toString(): string { return this.className }

        get timelimit(): number { return _5_SECONDS; }

        constructor( public source: ISource ) { }

        // actions in natural order
        // first on results list are first to resolve
        abstract resolve( self: IActionType, context: T ): PromiseOfActions;

        //abstract resolvable(param: P, context: T): boolean;
    }



    /**
     *  BaseAction<T>
     *   action with no consequences
     */
    //    export abstract class SimpleAction<T extends IContext> extends IAction<T> {
    //
    //        resolve(self: SimpleAction<T>, context: T): PromiseOfActions {
    //
    //            return new Promise<IAction<T>[]>((resolve: any, reject: any): void => {
    //                self.baseActionResolver(self, context);
    //
    //                resolve(NO_CONSEQUENCES);
    //            });
    //        }
    //
    //        protected abstract baseActionResolver(self: IAction < T >, context: T): void;
    //
    //    }


    export class InlineAction<T extends IContext> extends IAction<T> {

        resolve( self: IActionType, context: T ): PromiseOfActions {
            return new Promise<IAction<T>[]>( this.executor );
        }

        constructor( protected executor: FPromiseExecutor<IAction<T>[]> ) {
            super( null );
        }
    }

    export type IActionType = IAction<IContext>;


}