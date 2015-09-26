/////<reference path="RpcToken.ts"/>
/////<reference path="../CommTypy.ts"/>
/////<reference path="../Helper.ts"/>
/////<reference path="../Const.ts"/>
/////<reference path="../Commons/AsyncTask.ts"/>


//interface IRpcActionTask extends IRpcTask {
//    action: IAction;
//}



//interface XXControllerTaskParam {
//    action: IAction;
//}


//class XXController {
    
//    taskRunner : RpcTaskRunner;
//    stack : IAction[] = [];

//    private fillTaskFnc: FillTaskFnc = (task: IRpcActionTask, params: XXControllerTaskParam): void => {
//        task.action = params.action;
//    }


//    putActionOnStack(action: IAction): void {
//        //this.runLocal(new PutOnStackRpcTask(), action);
//    }
//}


//class RpcActionTask extends RpcTask implements IRpcActionTask {
//    onSuccessCallback : AsyncTaskSuccess = null;
//    onErrorCallback   : AsyncTaskError   = null;
//    onTimeoutCallback : AsyncTaskTimeout = null;
//    controller        : XXController     = null;
//    action            : IAction          = null;
//    communicator      : ICommunicator    = null;
//    parent            : RpcTaskRunner    = null;

//    asyncTaskState: AsyncTaskState = AsyncTaskState.NEW;
//    isFinished: boolean = false;

//    toString(): string { return this.constructor['name'] }; 

//    run(): void {

//    }
//}



//class RpcActionMethodHelper {

//    static callRemoteMethodAndWait(method: IRpcMethod, action: IAction, dataMap: IObjectMap,
//        onSuccess: TokenSuccessCallback,
//        onError: TokenErrorCallback,
//        onTimeout: TokenTimeoutCallback): IRpcToken {

//        var communicator: ICommunicator = method.parent.communicator;
//        var token: IRpcToken = communicator.buildToken(method.name, action, dataMap);

//        token.onSuccess = (token: IRpcToken, result: IObjectMap): void =>
//            onSuccess(token, result);

//        token.onError = (token: IRpcToken, error: Error): void =>
//            onError(token, error);

//        token.onTimeout = (token: IRpcToken): void =>
//            onTimeout(token);

//        communicator.callRpc(token);

//        return token;
//    }

//    static callSuccessHandler(method: IRpcMethod, token: IRespondToken, result: IObjectMap): void {
//        var communicator: ICommunicator = method.parent.communicator;

//        communicator.respondTo(token, result);
//    }

//    static callErrorHandler(method: IRpcMethod, token: IRespondToken, error: Error): void {
//        var communicator: ICommunicator = method.parent.communicator;

//        communicator.respondErrorTo(token, error);
        
//    }
//}


//class PutOnStackRpcMethod implements IRpcMethod {
//    static METHOD_NAME : string = 'PutOnStackRpcMethod';

//    controller: XXController;
//    parent : IRpcTask;

//    local  : IRpcLocalMethod;
//    remote : IRpcRemoteMethod;

//    get name(): string {return PutOnStackRpcMethod.METHOD_NAME};
//}



//class PutOnStackRpcLocalMethod implements IRpcLocalMethod {
    
//    constructor (public parent: PutOnStackRpcMethod) {}

//    run(action: IAction): IObjectMap {
//        this.parent.controller.stack.push(action);

//        //RpcActionMethodHelper.callRemoteMethodAndWait(
//        //    this.parent,
//        //    action,
//        //    null,
//        //    (token, result) => this.onSuccess(result),
//        //    (token, error) => {throw error},
//        //    (token) => {throw new Error('timeout')});
//        return null;
//    };

//    remoteMethodSuccessHandler(result: IObjectMap): void {
//        this.parent.parent.onMethodSuccess(this.parent);
//    };
//}


//class PutOnStackRpcRemoteMethod implements IRpcRemoteMethod {
    
//    constructor (public parent: PutOnStackRpcMethod) {}
    
//    run(token: IRespondToken, action: IAction, dataMap: IObjectMap): IObjectMap {
//        this.parent.controller.stack.push(action);
        
//        return null;
//        //RpcActionMethodHelper.callSuccessHandler(this.parent, token, null);
//    }
//}

