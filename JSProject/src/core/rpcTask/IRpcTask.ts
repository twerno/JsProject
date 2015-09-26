///<reference path="../rpc/IRpcController.ts"/>
///<reference path="RpcTask.ts"/>
///<reference path="../CommTypy.ts"/>
///<reference path="../Commons/AsyncTaskRunner.ts"/>

interface IRpcTaskController extends rpc.IRpcController<IRpcTask> {

    registerTask(rpcTask: IRpcTask): rpc.IRpcToken;
    onRegisterTask: (respondToken: rpc.IRespondToken, rpcTask: IRpcTask) => void;

    runRunRemoteMethod(methodName: string, result: rpc.IJsonMetaData): rpc.IRpcToken;
    onRunRemoteMethod: (respondToken: rpc.IRespondToken, methodName: string, result: rpc.IJsonMetaData) => void;

    unregisterTask(rpcTask: IRpcTask): rpc.IRpcToken;
    onUnregisterTask: (respondToken: rpc.IRespondToken, rpcTask: IRpcTask) => void;
}



interface IRpcTask extends IAsyncTask, rpc.IJsonMetaData {
    controller: IRpcTaskController;

    name: string;
    params: IObjectMap;

    getNextMethod(): IRpcMethod;
}



interface IRpcMethod {
    name: string;
    parent: IRpcTask;

    local: IRpcLocalMethod;
    remote: IRpcRemoteMethod;
}



interface IRpcLocalMethod {
    parent: IRpcMethod;

    run(): IObjectMap;

    remoteMethodSuccessHandler(result: IObjectMap): void;
}



interface IRpcRemoteMethod {
    parent: IRpcMethod;

    run(dataMap: IObjectMap): IObjectMap;
}

