"use strict";

namespace asyncRunner {

    export const enum AsyncTaskState {
        NEW,
        WORKING,
        FINISHED_SUCCESS,
        FINISHED_ERROR,
        FINISHED_TIMEOUT,
        FINISHED_KILLED
    }
    export const enum AsyncTaskFailureCode {ERROR, TIMEOUT}


    export type AsyncTaskWorker  = (onSuccess: AsyncTaskSuccess, onFailure: AsyncTaskFailure) => void;
    export type AsyncTaskSuccess = (result?: Object) => void;
    export type AsyncTaskFailure = (msg?: string, details?: Object) => void;


    export type AsyncRunnerSuccess = (task: IAsyncTask, result?: Object) => void;
    export type AsyncRunnerFailure = (task: IAsyncTask, code: AsyncTaskFailureCode, msg?: string, details?: Object) => void;


    export class AsyncTaskTimeoutError extends Error {
        timeout: number;
    }


    export abstract class IAsyncTask {
        asyncTaskState: AsyncTaskState;

        abstract run(onSuccess: AsyncTaskSuccess, onFailure: AsyncTaskFailure): void;
    }


    export class AsyncTaskRunner {

        private timeoutHandler: number = 0;


        constructor(
            private task: IAsyncTask,
            private onSuccess: AsyncRunnerSuccess,
            private onFailure: AsyncRunnerFailure,
            private timeout: number = 0) { }


        runAsync(): void {

            if ((this.task || null) === null)
                throw new Error(`Task cant be null.`);

            if (!(this.task instanceof IAsyncTask))
                throw new Error(`Task has to be IAsyncTask type.`);

            if (typeof this.task.run != 'function')
                throw new Error(`Task has no "run" method.`);

            this.task.asyncTaskState = AsyncTaskState.NEW;

            if ((this.timeout || 0) > 0)
                this.timeoutHandler = setTimeout(() => this.internalOnTimeout(), this.timeout);

            setTimeout(() => this._internalRun(), 1);
        }
 

        kill(): void {
            clearTimeout(this.timeoutHandler);
            if (this.task === null)
                return;

            this.task.asyncTaskState = AsyncTaskState.FINISHED_KILLED;
            this.cleanUp();
        }


        isWorking(): boolean {
            return this.task != null && this.task.asyncTaskState === AsyncTaskState.WORKING;
        }
  

        private _internalRun(): void {
            try {
                this.task.run(
                    (result): void => this.internalOnSuccess(result || null),
                    (msg, details): void => this.internalOnFailure(AsyncTaskFailureCode.ERROR, msg || '', details || null));
            } catch (error) {
                this.internalOnFailure(AsyncTaskFailureCode.ERROR, error.msg, {error: error});
            }
        }
 

        private internalOnSuccess(result: Object) {
            clearTimeout(this.timeoutHandler);
            if (this.task === null)
                return;

            let task: IAsyncTask = this.task; 
            let onSuccess: AsyncRunnerSuccess = this.onSuccess;

            this.cleanUp();

            task.asyncTaskState = AsyncTaskState.FINISHED_SUCCESS;
            onSuccess === null || onSuccess(task, result);
        }


        private internalOnFailure(code: AsyncTaskFailureCode, msg?: string, details?: Object): void {
            clearTimeout(this.timeoutHandler);
            if (this.task === null)
                return;

            let task: IAsyncTask = this.task; 
            let onFailure: AsyncRunnerFailure = this.onFailure;

            this.cleanUp();

            task.asyncTaskState = (code === AsyncTaskFailureCode.TIMEOUT ? AsyncTaskState.FINISHED_TIMEOUT : AsyncTaskState.FINISHED_ERROR);
            onFailure === null || onFailure(task, code, msg, details);
        }


        private internalOnTimeout() {
            clearTimeout(this.timeoutHandler);
            if (this.task === null)
                return;

            let error:AsyncTaskTimeoutError = new AsyncTaskTimeoutError(`[Timeout] AsyncTaskRunner; task: ${this.task}`);
            error.timeout = this.timeout;

            this.internalOnFailure(AsyncTaskFailureCode.TIMEOUT, error.message, {error: error});
        }
 

        private cleanUp(): void {
            clearTimeout(this.timeoutHandler);

            this.task = null;
            this.timeoutHandler = null;
            this.timeout = null;
            this.onSuccess = null;
            this.onFailure = null;
        }
    }



    class AsyncMethodWrapperTask extends IAsyncTask {

        run(onSuccess: AsyncTaskSuccess, onFailure: AsyncTaskFailure): void {
            this.worker(onSuccess, onFailure);
        }

        constructor(private worker: AsyncTaskWorker) {
            super();
        }
    }



    export class AsyncMethodRunner {
        private asyncRunner: AsyncTaskRunner;

        constructor(
            worker: AsyncTaskWorker,
            private onSuccess: AsyncRunnerSuccess,
            private onFailure: AsyncRunnerFailure,
            timeout?: number) {

            let wrapper: AsyncMethodWrapperTask = new AsyncMethodWrapperTask(worker);

            this.asyncRunner = new AsyncTaskRunner(
                wrapper,
                onSuccess,
                onFailure,
                timeout);
        }


        runAsync(): void {
            this.asyncRunner.runAsync();
        }


        kill(): void {
            this.asyncRunner.kill();
        }


        isWorking(): boolean {
            return this.asyncRunner.isWorking();
        }
    }
}