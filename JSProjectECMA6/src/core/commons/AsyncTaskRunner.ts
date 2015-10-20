"use strict";

namespace asyncUtils6 {

    export const enum TaskState {
        NEW,
        WORKING,
        FINISHED_SUCCESS,
        FAILED_ERROR,
        FAILED_KILLED,
        FAILED_TIMEOUT
    }
    export const enum TaskFailureCode { ERROR, TIMEOUT, KILLED }


    export type AsyncWorker = (onSuccess: TaskSuccessCallback, onFailure: TaskFailureCallback) => void;
    export type TaskSuccessCallback = (result?: Object) => void;
    export type TaskFailureCallback = (error: Error) => void;


    export type RunnerSuccessCallback = (task: IAsyncTask, result?: Object) => void;
    export type RunnerFailureCallback = (task: IAsyncTask, code: TaskFailureCode, error: Error) => void;



    export class AsyncTaskTimeoutError extends Error {
        timeLimit: number;

        constructor(message: string) {
            super();
            this.message = message;
        };
    }



    export abstract class IAsyncTask {
        asyncTaskState: TaskState;
        executionTime: number;

        abstract run(onSuccess: TaskSuccessCallback, onFailure: TaskFailureCallback): void;
    }



	export abstract class ITaskRunner {

        abstract runAsync(timeLimit: number): void;
        abstract kill(silent: boolean): void;
        abstract isWorking(): boolean;
    }



    export class AsyncTaskRunner extends ITaskRunner {

        private _timeoutHandler: number = 0;
        private _timeLimit: number = 0;
        private _startTime: number;


        constructor(
            private _task: IAsyncTask,
            private _onSuccess: RunnerSuccessCallback,
            private _onFailure: RunnerFailureCallback) { super(); }


        runAsync(timeLimit: number): void {

            if ((this._task || null) === null)
                throw new Error(`Task cant be null.`);

            if (!(this._task instanceof IAsyncTask))
                throw new Error(`Task has to be IAsyncTask type.`);

            if (typeof this._task.run != 'function')
                throw new Error(`Task has no "run" method.`);

            this._task.asyncTaskState = TaskState.NEW;
            this._timeLimit = timeLimit || 0;

            if (timeLimit > 0)
                this._timeoutHandler = setTimeout(() => this._internalOnTimeout(), timeLimit);

            setTimeout(() => this._internalRun(), 1);
        }


        kill(silent: boolean): void {
            this._internalOnFailure(TaskFailureCode.KILLED, null, silent);
        }


        isWorking(): boolean {
            return this._task != null && this._task.asyncTaskState === TaskState.WORKING;
        }


        private _internalRun(): void {
            try {
                this._startTime = performance.now();
                this._task.run(
                    (result): void => this._internalOnSuccess(result || null),
                    (error): void => this._internalOnFailure(TaskFailureCode.ERROR, error || null, false));
            } catch (error) {
                this._internalOnFailure(TaskFailureCode.ERROR, error, false);
            }
        }


        private _internalOnSuccess(result: Object) {
            clearTimeout(this._timeoutHandler);
            if (this._task === null)
                return;

            let task: IAsyncTask = this._task;
            let onSuccess: RunnerSuccessCallback = this._onSuccess;

            this._cleanUp();

            task.executionTime = performance.now() - this._startTime;
            task.asyncTaskState = TaskState.FINISHED_SUCCESS;
            onSuccess && onSuccess(task, result);
        }


        private _internalOnFailure(code: TaskFailureCode, error: Error, silent: boolean): void {
            clearTimeout(this._timeoutHandler);
            if (this._task === null && !this._emergencyThrowError(code, error))
                return;

            let task: IAsyncTask = this._task;
            let onFailure: RunnerFailureCallback = this._onFailure;

            this._cleanUp();

            task.executionTime = performance.now() - this._startTime;
            task.asyncTaskState = this._FailureCode2ATaskState(code);
            !silent && onFailure && onFailure(task, code, error);
        }


        private _emergencyThrowError(code: TaskFailureCode, error: Error): boolean {
            if (code === TaskFailureCode.ERROR) {
                if (error != null)
                    throw error
                else
                    throw new Error('Unknown error');
            }

            return false;
        }


        private _internalOnTimeout() {
            clearTimeout(this._timeoutHandler);
            if (this._task === null)
                return;

            let error: AsyncTaskTimeoutError = new AsyncTaskTimeoutError(`[timeout] ${this._timeLimit} milliseconds.`);
            error.timeLimit = this._timeLimit;

            this._internalOnFailure(TaskFailureCode.TIMEOUT, error, false);
        }


        private _cleanUp(): void {
            clearTimeout(this._timeoutHandler);

            this._task = null;
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



    class AsyncMethodWrapperTask extends IAsyncTask {

        run(onSuccess: TaskSuccessCallback, onFailure: TaskFailureCallback): void {
            this._worker(onSuccess, onFailure);
        }

        constructor(private _worker: AsyncWorker) {
            super();
        }
    }



    export class AsyncMethodRunner extends ITaskRunner {
        private _asyncRunner: AsyncTaskRunner;

        constructor(
            worker: AsyncWorker,
            private _onSuccess: RunnerSuccessCallback,
            private _onFailure: RunnerFailureCallback) {

            super();
            this._asyncRunner = new AsyncTaskRunner(new AsyncMethodWrapperTask(worker), _onSuccess, _onFailure);
        }


        runAsync(timeLimit: number): void {
            this._asyncRunner.runAsync(timeLimit);
        }


        kill(silent: boolean): void {
            this._asyncRunner.kill(silent);
        }


        isWorking(): boolean {
            return this._asyncRunner.isWorking();
        }
    }



    export type SyncWorker = () => void;

    class MethodWrapperTask extends IAsyncTask {

        run(onSuccess: TaskSuccessCallback, onFailure: TaskFailureCallback): void {
            this._syncWorker();
            onSuccess(null);
        }

        constructor(private _syncWorker: SyncWorker) {
            super();
        }
    }



    export class SyncMethodRunner extends ITaskRunner {
        private _asyncRunner: AsyncTaskRunner;

        constructor(
            syncWorker: SyncWorker,
            private _onSuccess: RunnerSuccessCallback,
            private _onFailure: RunnerFailureCallback) {

            super();
            this._asyncRunner = new AsyncTaskRunner(new MethodWrapperTask(syncWorker), _onSuccess, _onFailure);
        }


        runAsync(timeLimit: number): void {
            this._asyncRunner.runAsync(timeLimit);
        }


        kill(silent: boolean): void {
            this._asyncRunner.kill(silent);
        }


        isWorking(): boolean {
            return this._asyncRunner.isWorking();
        }
    }
}