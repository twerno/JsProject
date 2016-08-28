"use strict";

namespace CommonUtils {

    export type PromiseResolve<T> = ( value?: T | PromiseLike<T> ) => void;
    export type PromiseReject = ( reason?: Error ) => void;
    export type PromiseWorker<T> = ( resolve: PromiseResolve<T>, reject: PromiseReject ) => void;

}