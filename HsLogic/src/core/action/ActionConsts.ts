"use strict";

namespace jsLogic {

    export type IActionType = IAction<IContext>;
    export type PromiseOfActions = Promise<IActionType | IActionType[]>;
    export type FPromiseExecutor<T> = ( resolve: ( value?: T | PromiseLike<T> ) => void, reject: ( reason?: any ) => void ) => void;


    export interface IContext {

    }

    export interface ISource {
        action: IActionType
    }

    export interface IActionParam {
        source: ISource
    }


    export const NO_CONSEQUENCES: any = null;

    export const UNLIMITED: number = 0;
    export const _30_SECONDS: number = 30 * 1000;
    export const _10_SECONDS: number = 10 * 1000;
    export const _5_SECONDS: number = 5 * 1000;

}