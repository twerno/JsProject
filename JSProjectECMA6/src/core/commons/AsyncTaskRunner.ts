"use strict";

namespace asyncRunner6 {

    export const enum AsyncTaskState {
        NEW,
        WORKING,
        FINISHED_SUCCESS,
        FAILED_ERROR,
        FAILED_TIMEOUT,
        FINISHED_KILLED
    }
    export const enum AsyncTaskFailureCode { ERROR, TIMEOUT }


    export type AsyncWorker = (onSuccess: AsyncTaskSuccess, onFailure: AsyncTaskFailure) => void;
    export type AsyncTaskSuccess = (result?: Object) => void;
    export type AsyncTaskFailure = (error: Error) => void;


    export type AsyncRunnerSuccess = (task: IAsyncTask, result?: Object) => void;
    export type AsyncRunnerFailure = (task: IAsyncTask, code: AsyncTaskFailureCode, error: Error) => void;



    export class AsyncTaskTimeoutError extends Error {
        timeLimit: number;

        constructor(message: string) {
            super();
            this.message = message;
        };
    }



    export abstract class IAsyncTask {
        asyncTaskState: AsyncTaskState;
        executionTime: number;

        abstract run(onSuccess: AsyncTaskSuccess, onFailure: AsyncTaskFailure): void;
    }



	export abstract class ITaskRunner {

        abstract runAsync(timeLimit: number): void;
        abstract kill(): void;
        abstract isWorking(): boolean;
    }



    export class AsyncTaskRunner extends ITaskRunner {

        private _timeoutHandler: number = 0;
        private _timeLimit: number = 0;
        private _startTime: number;


        constructor(
            private _task: IAsyncTask,
            private _onSuccess: AsyncRunnerSuccess,
            private _onFailure: AsyncRunnerFailure) { super(); }


        runAsync(timeLimit: number): void {

            if ((this._task || null) === null)
                throw new Error(`Task cant be null.`);

            if (!(this._task instanceof IAsyncTask))
                throw new Error(`Task has to be IAsyncTask type.`);

            if (typeof this._task.run != 'function')
                throw new Error(`Task has no "run" method.`);

            this._task.asyncTaskState = AsyncTaskState.NEW;
            this._timeLimit = timeLimit || 0;

            if (timeLimit > 0)
                this._timeoutHandler = setTimeout(() => this._internalOnTimeout(), timeLimit);

            setTimeout(() => this._internalRun(), 1);
        }


        kill(): void {
            clearTimeout(this._timeoutHandler);
            if (this._task === null)
                return;

            this._task.asyncTaskState = AsyncTaskState.FINISHED_KILLED;
            this._cleanUp();
        }


        isWorking(): boolean {
            return this._task != null && this._task.asyncTaskState === AsyncTaskState.WORKING;
        }


        private _internalRun(): void {
            try {
                this._startTime = performance.now();
                this._task.run(
                    (result): void => this._internalOnSuccess(result || null),
                    (error): void => this._internalOnFailure(AsyncTaskFailureCode.ERROR, error || null));
            } catch (error) {
                this._internalOnFailure(AsyncTaskFailureCode.ERROR, error);
            }
        }


        private _internalOnSuccess(result: Object) {
            clearTimeout(this._timeoutHandler);
            if (this._task === null)
                return;

            let task: IAsyncTask = this._task;
            let onSuccess: AsyncRunnerSuccess = this._onSuccess;

            this._cleanUp();

            task.executionTime = performance.now() - this._startTime;
            task.asyncTaskState = AsyncTaskState.FINISHED_SUCCESS;
            onSuccess && onSuccess(task, result);
        }


        private _internalOnFailure(code: AsyncTaskFailureCode, error: Error): void {
            clearTimeout(this._timeoutHandler);
            if (this._task === null && !this._emergencyThrowError(code, error))
                return;

            let task: IAsyncTask = this._task;
            let onFailure: AsyncRunnerFailure = this._onFailure;

            this._cleanUp();

            task.executionTime = performance.now() - this._startTime;
            task.asyncTaskState = (code === AsyncTaskFailureCode.TIMEOUT ? AsyncTaskState.FAILED_TIMEOUT : AsyncTaskState.FAILED_ERROR);
            onFailure && onFailure(task, code, error);
        }


        private _emergencyThrowError(code: AsyncTaskFailureCode, error: Error): boolean {
            if (code === AsyncTaskFailureCode.ERROR) {
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

            this._internalOnFailure(AsyncTaskFailureCode.TIMEOUT, error);
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
    }



    class AsyncMethodWrapperTask extends IAsyncTask {

        run(onSuccess: AsyncTaskSuccess, onFailure: AsyncTaskFailure): void {
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
            private _onSuccess: AsyncRunnerSuccess,
            private _onFailure: AsyncRunnerFailure) {

            super();
            this._asyncRunner = new AsyncTaskRunner(new AsyncMethodWrapperTask(worker), _onSuccess, _onFailure);
        }


        runAsync(timeLimit: number): void {
            this._asyncRunner.runAsync(timeLimit);
        }


        kill(): void {
            this._asyncRunner.kill();
        }


        isWorking(): boolean {
            return this._asyncRunner.isWorking();
        }
    }



    export type SyncWorker = () => void;

    class MethodWrapperTask extends IAsyncTask {

        run(onSuccess: AsyncTaskSuccess, onFailure: AsyncTaskFailure): void {
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
            private _onSuccess: AsyncRunnerSuccess,
            private _onFailure: AsyncRunnerFailure) {

            super();
            this._asyncRunner = new AsyncTaskRunner(new MethodWrapperTask(syncWorker), _onSuccess, _onFailure);
        }


        runAsync(timeLimit: number): void {
            this._asyncRunner.runAsync(timeLimit);
        }


        kill(): void {
            this._asyncRunner.kill();
        }


        isWorking(): boolean {
            return this._asyncRunner.isWorking();
        }
    }
}