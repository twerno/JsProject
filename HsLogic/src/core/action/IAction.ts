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
    export type FPromiseExecutor<T> = (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void;


	/**
     *  IAction<T>
     * 
     */
    export abstract class IAction<T extends IContext> {

        get className(): string { return ClassUtils.getNameOfClass(this) }

        toString(): string { return this.className }

        get timelimit(): number { return _5_SECONDS; }

        constructor(public source: IAction<T>) { }

        // actions in natural order
        // first on results list are first to resolve
        abstract resolve(_this_: IAction<T>, context: T): PromiseOfActions;
    }



    /**
     *  BaseAction<T>
     *   action with no consequences
     */
    export abstract class SimpleAction<T extends IContext> extends IAction<T> {

        resolve(_this_: SimpleAction<T>, context: T): PromiseOfActions {

            return new Promise<IAction<T>[]>((resolve: any, reject: any): void => {
                _this_.baseActionResolver(_this_, context);

                resolve(NO_CONSEQUENCES);
            });
        }

        protected abstract baseActionResolver(_this_: IAction<T>, context: T): void;

    }

    //export class InlineAction<T extends IContext, P extends IActionParam> extends IAction<T> {

    //    resolve(_this_: InlineAction<T, P>, context: T): PromiseOfActions {
    //        if (this.actionOrExecutor instanceof IAction) {
    //            let action: IAction<T> = <IAction<T>>this.actionOrExecutor;
    //            return action.resolve(_this_, context);
    //        } else if (typeof (this.actionOrExecutor) === typeof (Function)) {
    //            let executor: FPromiseExecutor<IAction<T>[]> = <FPromiseExecutor<IAction<T>[]>>this.actionOrExecutor;
    //            return new Promise<IAction<T>[]>(executor);
    //        }
    //    }

    //    constructor(sourceAction: IAction<T>, public actionOrExecutor: IAction<T> | FPromiseExecutor<IAction<T>[]>) {
    //        super(sourceAction);
    //    }
    //}

    export class InlineAction<T extends IContext, P extends IActionParam> extends IAction<T> {

        resolve(_this_: InlineAction<T, P>, context: T): PromiseOfActions {
            return new Promise<IAction<T>[]>(this.executor);
        }

        constructor(public executor: FPromiseExecutor<IAction<T>[]>) {
            super(null);
        }
    }


}