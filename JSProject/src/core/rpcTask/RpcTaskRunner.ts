///<reference path="../rpc/IRpcController.ts"/>
///<reference path="IRpcTask.ts"/>
///<reference path="../Const.ts"/>
///<reference path="../Commons/AsyncTaskRunner.ts"/>


//class RpcTaskRunner {
//    private rpcController: IRpcTaskController;
//    private currentTask: IRpcTask;
//    private asyncTaskRunner: AsyncTaskRunner<IRpcTask> = null;
//
//    constructor(
//        private onSuccess: (task: IRpcTask) => void,
//        private onError: (task: IRpcTask, error: Error) => void,
//        private onTimeout: (task: IRpcTask, msg: string) => void,
//        private timeout?: number) { }
//
//
//    initCommunicator(communicator: IRpcTaskController): void {
//        this.rpcController = communicator;
//        this.rpcController.onRegisterTask =
//        (token, rpcTask) => this.onRegisterTask(token, rpcTask);
//
//        this.rpcController.onUnregisterTask =
//        (token, rpcTask) => this.onUnregisterTask(token, rpcTask);
//
//        //TODO
//        //this.communicator.onRpcMethod =
//        //(token, rpcTask, methodName, dataMap) => this.onRpcMethod(token, rpcTask, methodName, dataMap);
//    }
//
//
//    // STEP 1 - local
//    runTask(task: IRpcTask): void {
//        if (this.currentTask != null) {
//            throw new Error(
//                `Cant execute a new task ${task} while another task ${this.currentTask} is running.`);
//        }
//
//        this.registerTask(task);
//    }
//
//
//    // STEP 2 - local
//    private registerTask(task: IRpcTask): void {
//        this.currentTask = task;
//
//        let token: rpc.IRpcToken = this.rpcController.registerTask(task);
//        token.onSuccess = (token, result) => this.executeTask();
//
//        token.onError = (error, token) => this.onTaskError(task, error);
//        token.onTimeout = (msg, token) => this.onTaskTimeout(task, msg);
//    }
//
// 
//    // STEP 3 - remote
//    private onRegisterTask(token: rpc.IRespondToken, task: IRpcTask): void {
//        this.currentTask = task;
//
//        this.rpcController.respondTo(token, null);
//    }
//
//
//    // STEP 4 - local
//    private executeTask(): void {
//        let task: IRpcTask = this.currentTask;
//
//        //run Task
//        this.asyncTaskRunner = new AsyncTaskRunner<IRpcTask>(task,
//            (task) => this.unregisterTask(task),
//            (task, error) => this.onTaskError(task, error),
//            (task, msg) => this.onTaskTimeout(task, msg),
//            Const.RPC_TASK_TIMEOUT);
//
//        this.asyncTaskRunner.runAsync();
//    }
//
//
//    // STEP 5 - remote; for each method
//    private onRpcMethod(respondToken: rpc.IRespondToken, task: IRpcTask, methodName: string, dataMap: IObjectMap): void {
//        var method: IRpcMethod = task.getNextMethod();
//        if (method.name != methodName) {
//            let error: Error = new Error(`method.name ${method.name} does not equals methodName ${methodName}.`);
//            this.rpcController.callError(error, respondToken);
//            this.onTaskError(task, error);
//        }
//
//        var result: IObjectMap = null;
//        try {
//            result = method.remote.run(dataMap);
//        } catch (err) {
//            this.rpcController.callError(err, respondToken);
//            this.onTaskError(task, err);
//        }
//
//        this.rpcController.respondTo(respondToken, JSON.stringify(result));
//    }
//
//
//    // STEP 6 - local
//    private unregisterTask(task: IRpcTask): void {
//        this.asyncTaskRunner = null;
//
//        let token: rpc.IRpcToken = this.rpcController.unregisterTask(task);
//        token.onSuccess = (token, result) => this.onTaskSuccess(this.currentTask);
//
//        token.onError = (error, token) => this.onTaskError(task, error);
//        token.onTimeout = (msg, token) => this.onTaskTimeout(task, msg);
//        //this.communicator.callRpc(token);
//    }
//
//
//    // STEP 7 - remote
//    private onUnregisterTask(respondToken: rpc.IRespondToken, task: IRpcTask): void {
//        if (this.currentTask === task)
//            this.currentTask = null;
//        else {
//            var error: Error = new Error(`currentTask ${this.currentTask} does not equals task ${task}`);
//            this.rpcController.callError(error, respondToken);
//            this.onTaskError(task, error);
//        }
//
//        this.rpcController.respondTo(respondToken, '');
//    }
//
//
//    // STEP 8 - local
//    private onTaskSuccess(task: IRpcTask): void {
//        this.currentTask = null;
//        this.onSuccess === null || this.onSuccess(task);
//    }
//
//
//    private onTaskError(task: IRpcTask, error: Error): void {
//        if (this.asyncTaskRunner != null)
//            this.asyncTaskRunner.kill();
//        this.asyncTaskRunner = null;
//        this.currentTask = null;
//
//        this.onError === null || this.onError(task, error);
//    }
//
//
//    private onTaskTimeout(task: IRpcTask, msg: string): void {
//        if (this.asyncTaskRunner != null)
//            this.asyncTaskRunner.kill();
//        this.asyncTaskRunner = null;
//        this.currentTask = null;
//
//        this.onTimeout === null || this.onTimeout(task, msg);
//    }
//}