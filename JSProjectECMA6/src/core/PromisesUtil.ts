"use strict";

namespace PromiseUtil {

    export class PromiseRejectError extends Error {

        constructor(message: string, public code: asyncUtils6.TaskFailureCode, public timeLimit: number) {
            super();
            this.message = message;
        }
    }

    export type resolveType<T> = (value?: T | PromiseLike<T>) => void;
    export type rejectType<T> = (reason?: PromiseRejectError) => void;
    export type executorType<T> = (resolve: resolveType<T>, reject: rejectType<T>) => void;
    //    export type onFulfilledType<T> = (value: T) => T | PromiseLike<T>; 
    //    export type onRejectType<T> = (reason: PromiseRejectError|Error) => void;

    export function timeoutSingle<T>(executor: executorType<T>, timeLimit?: number): Promise<T> {
        return new Promise<T>(
            (resolve: resolveType<T>, reject: rejectType<T>) => {
                var timeoutHandler: number = setTimeout(() => { reject(getTimeoutRejectInfo(timeLimit || 0)); }, timeLimit);

                let innerPromise: Promise<T> = new Promise<T>(executor)
                    .then((value: T): T | PromiseLike<T> => {
                        clearTimeout(timeoutHandler);
                        return value;
                    }, (reason: PromiseRejectError|Error): void => {
                        clearTimeout(timeoutHandler);
                        throw reason;
                    });
            });
    }

    export function timeoutSingle2<T>(executor: executorType<T>, timeLimit?: number): Promise<T> {
        return new Promise<T>(
            ( resolve: resolveType<T>, reject: rejectType<T> ) => {
                setTimeout(() => { reject( getTimeoutRejectInfo( timeLimit || 0 ) ); }, timeLimit );
                executor( resolve, reject );
            })
    }


    //    function timeoutWrapper<T>(executor: executorType<T>, timeLimit: number): Promise<T> {
    //        if ((timeLimit || 0) <= 0)
    //            throw new Error(`No timelimit defined: "#{timeLimit}"`);
    //
    //        var timeoutHandler: number = null;
    //
    //        let p: Promise<T> = new Promise<T>(
    //            (resolve: resolveType<T>, reject: rejectType<T>) => {
    //                timeoutHandler = setTimeout(() => { reject(getTimeoutRejectInfo(timeLimit || 0)); }, timeLimit);
    //
    //
    //
    //
    //            })/*.then<T>((value: T): T => {;
    //                clearTimeout(timeoutHandler);
    //                return T;
    //            })/*.catch<T>((error: Error): T => {
    //                clearTimeout(timeoutHandler);
    //                throw error;
    //            });*/
    //
    //        return p;
    //
    //
    //    }

    function getTimeoutRejectInfo(timeLimit: number): PromiseRejectError {
        return new PromiseRejectError(`[TIMEOUT] ${timeLimit} milliseconds.`, asyncUtils6.TaskFailureCode.TIMEOUT, timeLimit);
    }
}
    
    
    
