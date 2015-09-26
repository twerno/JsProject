///<reference path="AsyncTaskRunner.ts"/>
	
class AsyncMethodWrapperTask implements IAsyncTask {
    asyncTaskState: AsyncTaskState = AsyncTaskState.NEW;
    callbacks: AsyncTaskCallbacks = { onSuccess: null, onError: null, onTimeout: null };

    run(): void {
        try {
            this.worker();
        } catch (error) {
            this.callbacks === null
            || this.callbacks.onError === null
            || this.callbacks.onError(this, error);
        }
        this.callbacks === null
        || this.callbacks.onSuccess === null
        || this.callbacks.onSuccess(this);
    }

    constructor(private worker: () => void) { }
}



class AsyncMethodRunner {

    private asyncRunner: AsyncTaskRunner<AsyncMethodWrapperTask>;

    constructor(
        worker: () => void,
        onSuccess: (task: IAsyncTask) => void,
        onError: (task: IAsyncTask, error: Error) => void,
        onTimeout: (task: IAsyncTask, msg: string) => void,
        timeout?: number) {

        let wrapper: AsyncMethodWrapperTask = new AsyncMethodWrapperTask(worker);

        this.asyncRunner = new AsyncTaskRunner<AsyncMethodWrapperTask>(
            wrapper,
            onSuccess,
            onError,
            onTimeout,
            timeout);
    }



    runAsync(): void {
        this.asyncRunner.runAsync();
    }



    kill(): void {
        this.asyncRunner.kill();
    }
}