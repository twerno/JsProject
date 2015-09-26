/////<reference path="Action.ts"/>
/////<reference path="Task.ts"/>
/////<reference path="ActionController.ts"/>
/////<reference path="../Const.ts"/>
/////<reference path="RpcTask.ts"/>
 

//class PutOnStackRpcMethod extends RpcMethodHelper implements IRpcMethod {

//    static METHOD_NAME: string = 'PutOnStackRpcMethod';
//    controller: ActionController;


//    isRunAllowed(action: IAction): boolean {
//        return true;
//    }

//    isRemoteRunAllowed(action: IAction): boolean {
//        return true;
//    }

//    integrityTest(action: IAction, integrityChecksum: IDataIntegrityChecksum): boolean {
//        return true;
//    }

//    onResult_integrityTest(action: IAction, result: Object, integrityChecksum: IDataIntegrityChecksum): boolean {
//        return true;
//    }

//    run(action: IAction): void {
//        this.controller.stack.push(action);


//        this.callRpcMethodAndWaitForResponse(
//            this,
//            PutOnStackRpcMethod.METHOD_NAME,
//            action,
//            null,
//            (token: IRpcToken, responseCode: ResponseCode, result: Object) =>
//                this.defaultSuccessCallback(token, responseCode, result),

//            (token: IRpcToken, error: Error): void =>
//                this.defaultErrorCallback(token, error),

//            (token: IRpcToken): void =>
//                this.defaultTimeoutCallback(token));
//    }

//    validateResult(token: IRpcToken, responseCode: ResponseCode, result: Object): boolean {
//        return responseCode === ResponseCode.OK;
//    }

//    remoteRun(token: IRespondToken, action: IAction): void {
//        this.controller.stack.push(action);

//        this.controller.communicator.respondTo(token, ResponseCode.OK, null, null);
//        this.controller.clearCurrentMethod();
//    }
//}


///* **
// *
// *
// *
// */

//interface IDataIntegrityChecksum { };

//interface IDataIntegrityValidator {
//    take_onBeforeSnapShot();
//    take_onAfterSnapshot();

//    getChecksum(): IDataIntegrityChecksum;

//    validate_onBeforeChecksum(checksum: IDataIntegrityChecksum): boolean;
//    validate_onAfterChecksum(checksum: IDataIntegrityChecksum): boolean;
//}

//class RunActionRpcMethod extends RpcMethodHelper implements IRpcMethod {

//    static METHOD_NAME: string = 'RunActionRpcMethod';
//    controller: ActionController;
//    integrityValidator: IDataIntegrityValidator;


//    isRunAllowed(action: IAction): boolean {
//        return action.actionType === ActionType.WORKER;
//    }

//    isRemoteRunAllowed(action: IAction): boolean {
//        return action.actionType === ActionType.WORKER;
//    }

//    integrityTest(action: IAction, integrityChecksum: IDataIntegrityChecksum): boolean {
//        return this.integrityValidator.validate_onBeforeChecksum(integrityChecksum);
//    }

//    onResult_integrityTest(action: IAction, result: Object, integrityChecksum: IDataIntegrityChecksum): boolean {
//        return true;
//    }

//    run(action: IAction): void {
//        this.controller.state.setState(ControllerState.WORKING, action);
//        this.integrityValidator.take_onBeforeSnapShot();

//        var runner: TaskRunner = new TaskRunner(
//            action,
//            (action: IAction, result: ITaskResult): void =>
//                this.onActionSuccess(action, result),

//            (task: ITask, error: Error): void =>
//                this.defaultErrorCallback(null, error),

//            (task: ITask): void =>
//                this.defaultTimeoutCallback(null),

//            Const.WORKER_TIMEOUT_LOCAL);

//        runner.runAsync();
//    }

//    private onActionSuccess(action: IAction, result: ITaskResult): void {
//        this.integrityValidator.take_onAfterSnapshot();

//        this.callRpcMethodAndWaitForResponse(
//            this,
//            PutOnStackRpcMethod.METHOD_NAME,
//            action,
//            this.integrityValidator.getChecksum(),
//            (token: IRpcToken, responseCode: ResponseCode, result: Object) =>
//                this.defaultSuccessCallback(token, responseCode, result),

//            (token: IRpcToken, error: Error): void =>
//                this.defaultErrorCallback(token, error),

//            (token: IRpcToken): void =>
//                this.defaultTimeoutCallback(token));
//    }

//    validateResult(token: IRpcToken, responseCode: ResponseCode, result: Object): boolean {
//        return responseCode === ResponseCode.OK;
//    }

//    remoteRun(token: IRespondToken, action: IAction): void {
//        this.controller.state.setState(ControllerState.WORKING, action);
//        this.integrityValidator.take_onBeforeSnapShot();

//        var runner: TaskRunner = new TaskRunner(
//            action,
//            (action: IAction, result: ITaskResult): void =>
//                this.onRemoteActionSuccess(token, action, result),

//            (task: ITask, error: Error): void =>
//                this.defaultRemoteErrorCallback(this, token, error),

//            (task: ITask): void =>
//                this.defaultRemoteTimeoutCallback(this, token),

//            Const.WORKER_TIMEOUT_LOCAL);

//        runner.runAsync();
//    }

//    private onRemoteActionSuccess(token: IRespondToken, action: IAction, result: ITaskResult): void {
//        this.integrityValidator.take_onAfterSnapshot();
//        this.controller.communicator.respondTo(token, ResponseCode.OK, action.results, this.integrityValidator.getChecksum());
//        this.controller.clearCurrentMethod();
//    }
//}