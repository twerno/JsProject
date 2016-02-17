"use strict";

namespace jsLogic {

    export type PromiseOfActions<T> = Promise<IAction<T>[]>;
    export const NO_CONSEQUENCES: any = null;

    export const UNLIMITED: number = 0;
    export const _30_SECONDS: number = 30 * 1000;



    /**
     *  IAction<T>
     * 
     */
    export abstract class IAction<T> {

        toString(): string {
            return Utils.getNameOfClass(this);
        }

        get timelimit(): number { return _30_SECONDS; }

        constructor(public source: IAction<T>) { }

        // actions in natural order
        // first on results list are first to resolve
        abstract resolve(param: T): PromiseOfActions<T>;
    }


    
    /**
     *  BaseAction<T>
     *   action with no consequences
     */
    export abstract class BaseAction<T> extends IAction<T> {

        resolve(param: T): PromiseOfActions<T> {
            return new Promise<IAction<T>[]>(

                (resolve, reject): void => {
                    this.baseActionResolver(param);

                    resolve(NO_CONSEQUENCES);
                });
        }

        protected abstract baseActionResolver(param: T): void;

    }

}