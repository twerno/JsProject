"use strict";

const enum AsyncTaskState {
    NEW,
    WORKING,
    FINISHED_SUCCESS,
    FINISHED_ERROR,
    FINISHED_TIMEOUT,
    FINISHED_KILLED
}



type AsyncTaskSuccess = (task: IAsyncTask) => void;
type AsyncTaskError = (task: IAsyncTask, error: Error) => void;
type AsyncTaskTimeout = (task: IAsyncTask, msg: string) => void;



interface AsyncTaskCallbacks {
    onSuccess: AsyncTaskSuccess;
    onError: AsyncTaskError;
    onTimeout: AsyncTaskTimeout;
}



interface IAsyncTask {
    asyncTaskState: AsyncTaskState;
    callbacks: AsyncTaskCallbacks;

    run(): void;
}



class AsyncTaskRunner<T extends IAsyncTask> {

    private timeoutHandler: number = 0;


    constructor(
        private task: T,
        private onSuccess: (task: T) => void,
        private onError: (task: T, error: Error) => void,
        private onTimeout: (task: T, msg: string) => void,
        private timeout?: number) { }



    runAsync(): void {

        if ((this.task || null) === null)
            throw new Error('Task is null is not defined');

        this.clearTasksCallbacks(this.task);

        this.task.callbacks.onSuccess = (task) => this.internalOnSuccess();
        this.task.callbacks.onError = (task, error) => this.internalOnError(error);
        this.task.callbacks.onTimeout = (task, msg) => this.internalOnTimeout2(msg);

        this.task.asyncTaskState = AsyncTaskState.NEW;

        if ((this.timeout || 0) > 0)
            this.timeoutHandler = setTimeout(() => this.internalOnTimeout1, this.timeout);

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
            this.task.run();
        } catch (error) {
            this.internalOnError(error);
        }
    }



    private internalOnSuccess() {
        clearTimeout(this.timeoutHandler);
        if (this.task === null)
            return;

        this.clearTasksCallbacks(this.task);
        this.task.asyncTaskState = AsyncTaskState.FINISHED_SUCCESS;
        this.onSuccess === null || this.onSuccess(this.task);
        this.cleanUp();
    }



    private internalOnTimeout1() {
        clearTimeout(this.timeoutHandler);
        if (this.task === null)
            return;

        this.clearTasksCallbacks(this.task);
        this.task.asyncTaskState = AsyncTaskState.FINISHED_TIMEOUT;
        this.onTimeout === null || this.onTimeout(this.task, `[Timeout] AsyncTaskRunner; task: ${this.task}`);
        this.cleanUp();
    }



    private internalOnTimeout2(msg: string): void {
        clearTimeout(this.timeoutHandler);
        if (this.task === null)
            return;

        this.clearTasksCallbacks(this.task);
        this.task.asyncTaskState = AsyncTaskState.FINISHED_TIMEOUT;
        this.onTimeout === null || this.onTimeout(this.task, msg);
        this.cleanUp();
    }



    private internalOnError(error: Error): void {
        clearTimeout(this.timeoutHandler);
        if (this.task === null)
            return;

        this.clearTasksCallbacks(this.task);
        this.task.asyncTaskState = AsyncTaskState.FINISHED_ERROR;
        this.onError === null || this.onError(this.task, error);
        this.cleanUp();
    }



    private cleanUp(): void {
        clearTimeout(this.timeoutHandler);

        this.task = null;
        this.timeoutHandler = null;
        this.timeout = null;
        this.onSuccess = null;
        this.onError = null;
        this.onTimeout = null;
    }



    private clearTasksCallbacks(task: IAsyncTask): void {
        this.task.callbacks = { onSuccess: null, onError: null, onTimeout: null };
    }

}
