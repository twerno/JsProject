"use strict";

namespace asyncUtils6 {

    const SILENCE = false;
    const VERBOSE = true;

    export const enum TaskState {
        PENDING,
        WORKING,
        FINISHED_SUCCESS,
        FAILED_ERROR,
        FAILED_KILLED,
        FAILED_TIMEOUT
    }

    export const enum TaskFailureCode {
        ERROR,
        TIMEOUT,
        KILLED
    }



    export type SuccessCallback<T> = (executionInfo: TaskAndExecutionInfo<T>, result: T) => void;
    export type FailureCallback<T> = (executionInfo: TaskAndExecutionInfo<T>, code: TaskFailureCode, error: Error) => void;


    export type AsyncWorker<T> = (success: TaskSuccessCallback<T>, failure: TaskFailureCallback) => void;
    export type TaskSuccessCallback<T> = (result: T) => void;
    export type TaskFailureCallback = (error: Error) => void;

    export abstract class AsyncTask<T> {
        abstract run(success: TaskSuccessCallback < T >, failure: TaskFailureCallback): void;
    }



    export class TaskAndExecutionInfo<T> {
        task: AsyncTask<T> | AsyncWorker<T>;
        state: TaskState;
        executionTime: number;
    }



    export class AsyncTaskRunner<T> {

        private _timeoutHandler: number = 0;
        private _timeLimit: number = 0;
        private _startTime: number;
        private _taskExecutionInfo: TaskAndExecutionInfo<T>;
        private _onSuccess: SuccessCallback<T> = null;
        private _onFailure: FailureCallback<T> = null;


        constructor(
            private _task: AsyncTask<T> | AsyncWorker<T>) {

            this._taskExecutionInfo = {
                task: _task,
                state: TaskState.PENDING,
                executionTime: 0
            }

        }


        success(onSuccess: SuccessCallback<T>): AsyncTaskRunner<T> {
            this._onSuccess = onSuccess;
            return this;
        }


        failure(onFailure: FailureCallback<T>): AsyncTaskRunner<T> {
            this._onFailure = onFailure;
            return this;
        }


        run(timeLimit: number): AsyncTaskRunner<T> {
            if (this._taskExecutionInfo.state != TaskState.PENDING)
                throw new Error('Create new instance of AsyncTaskRunner for every task.');

            this._prepareToRun(timeLimit);
            setTimeout(() => this._internalRun(), 0);

            return this;
        }


        killSilently(): void {
            this._internalOnFailure(TaskFailureCode.KILLED, null, SILENCE);
        }


        killAndCallFailure(): void {
            this._internalOnFailure(TaskFailureCode.KILLED, null, VERBOSE);
        }


        isWorking(): boolean {
            return this._taskExecutionInfo && this._taskExecutionInfo.state === TaskState.WORKING;
        }


        executionTime(): number {
            if (!this._taskExecutionInfo)
                return -1
            else if (this._taskExecutionInfo.state === TaskState.PENDING)
                return 0
            else if (this._taskExecutionInfo.state === TaskState.WORKING)
                return performance.now() - this._startTime
            else
                return this._taskExecutionInfo.executionTime;
        }


        private _prepareToRun(timeLimit: number): void {
            if ((this._task || null) === null)
                throw new Error(`Task cant be null.`);

            this._timeLimit = timeLimit || 0;

            if (timeLimit > 0)
                this._timeoutHandler = setTimeout(() => this._internalOnTimeout(), timeLimit);
        }


        private _internalRun(): void {
            try {
                this._startTime = performance.now();

                if (this._taskExecutionInfo.task instanceof AsyncTask) {
                    //                    let p: Promise<T> = (<AsyncTask<T>>this._taskInfo.task).run();
                    //                    p.catch(
                    //                        (error: Error): void => {
                    //                            this._internalOnFailure(TaskFailureCode.ERROR, error || null, VERBOSE);
                    //                        });



                    let task: AsyncTask<T> = <AsyncTask<T>> this._taskExecutionInfo.task;
                    task.run(
                        (result: T): void => this._internalOnSuccess(result || null),
                        (error: Error): void => this._internalOnFailure(TaskFailureCode.ERROR, error || null, VERBOSE));
                } else {
                    let worker: AsyncWorker<T> = <AsyncWorker<T>> this._taskExecutionInfo.task;
                    worker.call(null,
                        (result: T): void => { this._internalOnSuccess(result || null) },
                        (error: Error): void => this._internalOnFailure(TaskFailureCode.ERROR, error || null, VERBOSE));
                }

            } catch (error) {
                this._internalOnFailure(TaskFailureCode.ERROR, error, VERBOSE);
            }
        }


        private _internalOnSuccess(result: T) {
            clearTimeout(this._timeoutHandler);
            if (!this._taskExecutionInfo)
                return;

            this._taskExecutionInfo.executionTime = performance.now() - this._startTime;
            let taskInfo: TaskAndExecutionInfo<T> = this._taskExecutionInfo;
            let onSuccess: SuccessCallback<T> = this._onSuccess;

            this._destroy();

            taskInfo.state = TaskState.FINISHED_SUCCESS;
            onSuccess && onSuccess(taskInfo, result);
        }


        private _internalOnFailure(code: TaskFailureCode, error: Error, tfVerbose: boolean): void {
            clearTimeout(this._timeoutHandler);
            if (!this._taskExecutionInfo) {
                this._postMortemLogError(code, error);
                return;
            }

            this._taskExecutionInfo.executionTime = performance.now() - this._startTime;
            let taskInfo: TaskAndExecutionInfo<T> = this._taskExecutionInfo;
            let onFailure: FailureCallback<T> = this._onFailure;

            this._destroy();

            taskInfo.state = this._FailureCode2ATaskState(code);
            tfVerbose && onFailure && onFailure(taskInfo, code, error);
        }


        private _postMortemLogError(code: TaskFailureCode, error: Error): void {
            if (code === TaskFailureCode.ERROR) {
                console.error(error);
            }
        }


        private _internalOnTimeout() {
            clearTimeout(this._timeoutHandler);
            if (this._task === null)
                return;

            let error: AsyncTaskTimeoutError = new AsyncTaskTimeoutError(`[TIMEOUT] ${this._timeLimit} milliseconds.`);
            error.timeLimit = this._timeLimit;

            this._internalOnFailure(TaskFailureCode.TIMEOUT, error, VERBOSE);
        }


        private _destroy(): void {
            clearTimeout(this._timeoutHandler);

            this._task = null;
            this._taskExecutionInfo = null;
            this._timeoutHandler = null;
            this._timeLimit = null;
            this._onSuccess = null;
            this._onFailure = null;
            this._startTime = null;
        }


        private _FailureCode2ATaskState(code: TaskFailureCode): TaskState {

            if (code === TaskFailureCode.TIMEOUT)
                return TaskState.FAILED_TIMEOUT;

            else if (code === TaskFailureCode.KILLED)
                return TaskState.FAILED_KILLED;

            else
                return TaskState.FAILED_ERROR;
        }
    }


    export class AsyncTaskTimeoutError extends Error {
        timeLimit: number;

        constructor(message: string) {
            super();
            this.message = message;
        };
    }
}