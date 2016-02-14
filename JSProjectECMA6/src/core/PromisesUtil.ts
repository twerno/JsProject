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

    export function getPromise<T>(executor: executorType<T>, timeLimit?: number): Promise<T> {
        timeLimit = timeLimit || 0;
        return new Promise<T>(
            (resolve: resolveType<T>, reject: rejectType<T>) => {
                timeLimit > 0 && setTimeout(() => { reject(getTimeoutRejectInfo(timeLimit)) }, timeLimit);
                executor(resolve, reject);
            })
    }


    function getTimeoutRejectInfo(timeLimit: number): PromiseRejectError {
        return new PromiseRejectError(`[TIMEOUT] ${timeLimit} milliseconds.`, asyncUtils6.TaskFailureCode.TIMEOUT, timeLimit);
    }


    export type SuccessHandlerType<T> = (taskRunner: TaskRunner<T>, result?: T) => void;
    export type FailureHandlerType<T> = (taskRunner: TaskRunner<T>, code: TaskFailureCode, error: Error) => void;

    export type AsyncWorker<T> = (success?: TaskSuccessCallback<T>, failure?: TaskFailureCallback) => void;
    export type TaskSuccessCallback<T> = (result: T) => void;
    export type TaskFailureCallback = (error: Error) => void;

    export const enum TaskState {
        PENDING,
        WORKING,
        DONE,
        FAILED_ERROR,
        FAILED_KILLED,
        FAILED_TIMEOUT
    }

    export const enum TaskFailureCode {
        ERROR,
        TIMEOUT,
        KILLED
    }


    class TaskRunnerInternal<T> {
        successHandler: SuccessHandlerType<T> = null;
        failureHandler: FailureHandlerType<T> = null;

        result: T = null;
        error: Error = null;
        errorCode: TaskFailureCode = null;
        timeoutHandler: number = null;

        static proc() { }
    }

    export class TaskRunner<T> {
        state: TaskState;
        timelimit: number;
        executionTime: number;

        private _internal: TaskRunnerInternal<T> = new TaskRunnerInternal<T>();

        constructor(worker: AsyncWorker<T>, timeLimit?: number) {
            this.state = TaskState.PENDING;
            this.timelimit = timeLimit || 0;
            runTask(this, worker, this._internal);
        }

        success(handler: SuccessHandlerType<T>): void {
            this._internal.successHandler = handler;
            callSuccess(this, this._internal, this._internal.result);
        }

        failure(handler: FailureHandlerType<T>): void {
            this._internal.failureHandler = handler;
            callFailure(this, this._internal, this._internal.errorCode, this._internal.error);
        }

    }

    function runTask<T>(runner: TaskRunner<T>, worker: AsyncWorker<T>, internals: TaskRunnerInternal<T>): void {
        runner.state = TaskState.WORKING;
        runner.timelimit > 0 && (internals.timeoutHandler = setTimeout(() => internalOnFailure(runner, internals, TaskFailureCode.TIMEOUT, null), runner.timelimit));

        try {
            worker.call(null,
                (result: T): void => {
                    clearTimeout(internals.timeoutHandler);
                    internalOnSuccess(runner, internals, result || null);
                },
                (error: Error): void => {
                    clearTimeout(internals.timeoutHandler);
                    internalOnFailure(runner, internals, TaskFailureCode.ERROR, error || null);
                })
        } catch (error) {
            internalOnFailure(runner, internals, TaskFailureCode.ERROR, error || null);
        }
    }

    function internalOnSuccess<T>(runner: TaskRunner<T>, internals: TaskRunnerInternal<T>, result: T): void {
        runner.state = TaskState.DONE;
    }

    function internalOnFailure<T>(runner: TaskRunner<T>, internals: TaskRunnerInternal<T>, code: TaskFailureCode, error: Error): void {

    }

    function failureCode2ATaskState(code: TaskFailureCode): TaskState {

        if (code === TaskFailureCode.TIMEOUT)
            return TaskState.FAILED_TIMEOUT;

        else if (code === TaskFailureCode.KILLED)
            return TaskState.FAILED_KILLED;

        else
            return TaskState.FAILED_ERROR;
    }

    function callSuccess<T>(runner: TaskRunner<T>, internals: TaskRunnerInternal<T>, result: T): boolean {
        if (result && internals && internals.successHandler) {
            internals.successHandler(runner, result);
            return true;
        }
        return false;
    }

    function callFailure<T>(runner: TaskRunner<T>, internals: TaskRunnerInternal<T>, code: TaskFailureCode, error: Error): boolean {
        if (code && internals && internals.failureHandler) {
            internals.failureHandler(runner, code, error);
            return true;
        }
        return false;
    }
}
    
    
    
