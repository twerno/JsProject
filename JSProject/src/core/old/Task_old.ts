
enum TaskState {
    SUCCESS,
    FAILURE,
    CANCEL,
    UNKNOWN
}


type IResultCallback = (result: Object) => void
type IErrorCallback = (error: Error) => void

type ITaskSucceessHandler = (task: ITask, result: ITaskResult) => void;
type ITaskErrorHandler = (task: ITask, error: Error) => void;
type ITaskHandler = (task: ITask) => void;
type ITaskAsyncWorker = (self: ITask, onSuccess: IResultCallback, onError: IErrorCallback) => void;


interface ITask {
    asyncWorker: ITaskAsyncWorker;

    applyResult(result: Object): void;
}


interface ITaskRunner {
    runAsync(): void;
}

interface ITaskResult {
    task_state: TaskState;
}



class TaskRunner implements ITaskRunner {


    


    private _task: ITask = null;
    private _timeoutHandler: number;

    private _timeout: number;
    private _onSuccess: ITaskSucceessHandler = null;
    private _onError: ITaskErrorHandler = null;
    private _onTimeout: ITaskHandler = null;

    constructor(task: ITask,
        onSuccess: ITaskSucceessHandler,
        onError: ITaskErrorHandler,
        onTimeout: ITaskHandler,
        timeout: number) {

        this._task = task;

        this._timeout = timeout || 0;
        this._onSuccess = onSuccess || null;
        this._onError = onError || null;
        this._onTimeout = onTimeout || null;
    }


    runAsync(): void {
        if (this._task.asyncWorker === null)
            throw new Error(this._task.toString() + ' - worker is not defined');

        setTimeout(this._task.asyncWorker, 1,
            this._task, this._internalOnSuccess, this._internalOnError);

        if (this._timeout > 0)
            this._timeoutHandler = setTimeout(this._internalOnTimeout, this._timeout);
    }


    private dispose(): void {
        clearTimeout(this._timeoutHandler);

        this._task = null;
        this._timeoutHandler = null;
        this._timeout = null;
        this._onSuccess = null;
        this._onError = null;
        this._onTimeout = null;
    }


    private _internalOnSuccess = function(result: ITaskResult): void {
        clearTimeout(this._timeoutHandler);
        this._task.applyResult(result);
        this._onSuccess === null || setTimeout(this._onSuccess, 1, this._task, result);
        this.dispose();
    }.bind(this);


    private _internalOnError = function(error: Error): void {
        clearTimeout(this._timeoutHandler);
        this._onError === null || setTimeout(this._onError, 1, this._task, error);
        this.dispose();
    }.bind(this);


    private _internalOnTimeout = function(): void {
        clearTimeout(this._timeoutHandler);
        this._onTimeout === null || setTimeout(this._onTimeout, 1, this._task);
        this.dispose();
    }.bind(this);

}



//class DummyTaskRunner implements ITaskRunner {

//    private _task: ITask;
//    private _onSuccess: ITaskSucceessHandler;

//    constructor(task: ITask,
//        onSuccess: ITaskSucceessHandler) {

//        this._task = task;
//        this._onSuccess = onSuccess;
//    }


//    runAsync(): void {
//        setTimeout(this._internalOnSuccess, 1);
//    }


//    private dispose(): void {
//        this._task = null;
//        this._onSuccess = null;
//    }


//    private _internalOnSuccess = function(): void {
//        this._task.applyResult(null);
//        this._onSuccess === null || setTimeout(this._onSuccess, 1, this._task, null);
//        this.dispose();
//    }.bind(this);
//}