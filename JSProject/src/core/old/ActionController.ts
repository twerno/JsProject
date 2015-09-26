/////<reference path="Action.ts"/>
/////<reference path="Task.ts"/>
/////<reference path="ActionControllerMethod.ts"/>
/////<reference path="RpcToken.ts"/>
/////<reference path="RpcTask.ts"/>






//enum ControllerState {
//    WAITING_FOR_RESPONSE,
//    WAITING_FOR_REMOTE_ACTION,
//    CONTINUE_EXECUTION,
//    WORKING
//}

//interface IControllerState {
//    setState(state: ControllerState): void;
//    setState(state: ControllerState, currentAction: IAction): void;
//    setState(state: ControllerState, currentToken: IRpcToken, currentAction: IAction): void;

//    state: ControllerState;
//    currentToken: IRpcToken;
//    currentAction: IAction;
//}


//class ActionController {

//    state: IControllerState;
//    communicator: ICommunicator;
//    stack: IAction[] = [];
//    rpcTaskBuilder: RpcTaskBuilder;
//    currentTask: IRpcTask;

//    constructor() {
//        //this.rpcTaskBuilder.register(PutOnStackRpcTask.METHOD_NAME, PutOnStackRpcTask.prototype);
//    }

//    onStackEmpty: (controller: ActionController) => void = null;


//    putActionOnStack(action: IAction): void {
//        //this.runLocal(new PutOnStackRpcTask(), action);
//    }


//    //przerobic na async z timeout
//    runLocal(task: IRpcTask, action: IAction): void {
//        task.controller = this;
//        this.currentTask = task;

//        if (task.isRunAllowed(action))
//            task.run(action);
//        else
//            throw new Error('Task ' + task + 'is not allowed here!');
//    }


//    //przerobic na async z timeout
//    runRemote(task: IRpcTask, token: IRespondToken, action: IAction, integrityChecksum: IDataIntegrityChecksum): void {
//        this.currentTask = task;

//        if (!task.isRemoteRunAllowed(action))
//            throw new Error('Remote task ' + task + 'is not allowed here!');

//        if (!task.integrityTest(action, integrityChecksum))
//            throw new Error('Data integrity error!');

//        task.remoteRun(token, action, integrityChecksum);
//    }


//    clearCurrentTask(): void {
//        this.currentTask = null;
//    }


//    processMessages(token: IRespondToken, rpcTaskName: string, action: IAction, integrityChecksum: IDataIntegrityChecksum): void {

//        var task: IRpcTask = this.rpcTaskBuilder.build(rpcTaskName);
//        task.controller = this;
//        this.runRemote(task, token, action, integrityChecksum);
//    }


//    asyncContinue(): void {
//        setInterval(() => this.continueExecution(), 1);
//    }

//    continueExecution(): void {
//        //
//    }

//}


////interface IRpcTask {
////    controller: ActionController;

////    isRunAllowed(action: IAction): boolean;
////    run(action: IAction): void;
    
////    isRemoteRunAllowed(action: IAction): boolean;
////    integrityTest(action: IAction, integrityChecksum: IDataIntegrityChecksum): boolean;

////    remoteRun(token: IRespondToken, action: IAction, integrityChecksum: IDataIntegrityChecksum): void;
////    onResult_integrityTest(action: IAction, result: Object, integrityChecksum: IDataIntegrityChecksum): boolean;
////    validateResult(token: IRpcToken, responseCode: ResponseCode, result: Object): boolean;    
////}


//class RpcTaskHelper {

//    callRpcTaskAndWaitForResponse(task: IRpcTask, taskName: string, action: IAction, integrityChecksum: IDataIntegrityChecksum,
//        onSuccess: TokenSuccessCallback,
//        onError: TokenErrorCallback,
//        onTimeout: TokenTimeoutCallback): IRpcToken {

//        var controller: ActionController = task.controller;
//        var communicator: ICommunicator = controller.communicator;
//        var state: IControllerState = controller.state;

//        var token: IRpcToken = communicator.buildToken(taskName, action, integrityChecksum);

//        token.onSuccess = (token: IRpcToken, responseCode: ResponseCode, result: Object): void => {
//            if (state.state != ControllerState.WAITING_FOR_RESPONSE)
//                throw new Error('"WAITING_FOR_RESPONSE" state required.');

//            if (token != controller.state.currentToken)
//                throw new Error('Current token does not equal recieved token.');

//            if (!task.validateResult(token, responseCode, result))
//                throw new Error('Result not validated!');

//            if (!task.onResult_integrityTest(action, result, integrityChecksum))
//                throw new Error('Data integrity error!');

//            onSuccess(token, responseCode, result);
//            state.setState(ControllerState.CONTINUE_EXECUTION);
//            controller.asyncContinue();
//        }

//        token.onError = (token: IRpcToken, error: Error): void =>
//            onError(token, error);

//        token.onTimeout = (token: IRpcToken): void =>
//            onTimeout(token);

//        communicator.callRpc(token);
//        state.setState(ControllerState.WAITING_FOR_RESPONSE, token, action);
//        return token;
//    }


//    defaultSuccessCallback: TokenSuccessCallback = (token: IRpcToken, responseCode: ResponseCode, result: Object): void => {

//    }


//    defaultErrorCallback: TokenErrorCallback = (token: IRpcToken, error: Error): void => {
//        throw error;
//    }


//    defaultTimeoutCallback: TokenTimeoutCallback = (token: IRpcToken): void => {
//        throw new Error('timeout!')
//    }


//    defaultRemoteErrorCallback = (task: IRpcTask, token: IRespondToken, error: Error): void => {
//        task.controller.communicator.respondErrorTo(token, error);
//        throw error;
//    }


//    defaultRemoteTimeoutCallback = (task: IRpcTask, token: IRespondToken): void => {
//        var error: Error = new Error('timeout!')
//        task.controller.communicator.respondErrorTo(token, error);
//        throw error;
//    }
//}
