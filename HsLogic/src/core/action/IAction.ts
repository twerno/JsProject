"use strict";

namespace jsLogic {

    export interface IContext {
        actionFactory: ActionFactory;
    }

    export interface IActionParam {
        sourceAction: IAction<IContext>
    }


    export type PromiseOfActions<T> = Promise<IAction<T>[]>;
    export const NO_CONSEQUENCES: any = null;

    export const UNLIMITED: number = 0;
    export const _30_SECONDS: number = 30 * 1000;
    export const _10_SECONDS: number = 10 * 1000;
    export const _5_SECONDS: number = 5 * 1000;


	/**
     *  IAction<T>
     * 
     */
    export abstract class IAction<T> {

        get className(): string { return ClassUtils.getNameOfClass(this) }

        toString(): string { return this.className }

        get timelimit(): number { return _5_SECONDS; }

        constructor(public source: IAction<T>) { }

        // actions in natural order
        // first on results list are first to resolve
        abstract resolve(_this_: IAction<T>, context: T): PromiseOfActions<T>;
    }



    /**
     *  BaseAction<T>
     *   action with no consequences
     */
    export abstract class SimpleAction<T> extends IAction<T> {

        resolve(_this_: SimpleAction<T>, context: T): PromiseOfActions<T> {

            return new Promise<IAction<T>[]>((resolve: any, reject: any): void => {
                _this_.baseActionResolver(_this_, context);

                resolve(NO_CONSEQUENCES);
            });


        }

        protected abstract baseActionResolver(_this_: IAction<T>, context: T): void;

    }

}