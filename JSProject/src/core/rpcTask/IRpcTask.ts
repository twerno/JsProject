///<reference path="../rpc/IRpcController.ts"/>
///<reference path="RpcTask.ts"/>
///<reference path="../CommTypy.ts"/>
///<reference path="../Commons/AsyncTaskRunner.ts"/>
///<reference path="../smartObject/SmartObject.ts"/>

"use strict";

interface IRpcTaskController extends rpc.IRpcController<smartObj.SmartObject> {

    registerTask(rpcTask: IRpcTask): rpc.IRpcToken;
    onRegisterTask: (respondToken: rpc.IRespondToken, rpcTask: IRpcTask) => void;

    runRunRemoteMethod(methodName: string, result: smartObj.SmartObject): rpc.IRpcToken;
    onRunRemoteMethod: (respondToken: rpc.IRespondToken, methodName: string, result: smartObj.SmartObject) => void;

    unregisterTask(rpcTask: IRpcTask): rpc.IRpcToken;
    onUnregisterTask: (respondToken: rpc.IRespondToken, rpcTask: IRpcTask) => void;
}



interface IRpcTask extends IAsyncTask {
    controller: IRpcTaskController;

    name: string;
    params: smartObj.SmartObject;

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

