///<reference path="../rpc/IRpcController.ts"/>
///<reference path="../rpc/RpcController.ts"/>
///<reference path="RpcTask.ts"/>
///<reference path="../CommTypy.ts"/>
///<reference path="../Commons/AsyncTaskRunner.ts"/>
///<reference path="IRpcTask.ts"/>

"use strict";

class RpcTaskController extends rpc.RpcController<smartObj.SmartObject> implements IRpcTaskController {

    static CONTROLLER_NAME: string = 'RpcTaskController';

    constructor(rpcCommunicator: rpc.IRpcCommunicator, jsonParser: rpc.JsonRpcParser<smartObj.SmartObject>) {
        super(RpcTaskController.CONTROLLER_NAME, rpcCommunicator, jsonParser);
    }

    registerTask(rpcTask: IRpcTask): rpc.IRpcToken {
        return null;
    }

    onRegisterTask: (respondToken: rpc.IRespondToken, rpcTask: IRpcTask) => void;

    unregisterTask(rpcTask: IRpcTask): rpc.IRpcToken {
        return null;
    }

    onUnregisterTask: (respondToken: rpc.IRespondToken, rpcTask: IRpcTask) => void;

    runRunRemoteMethod(methodName: string, result: smartObj.SmartObject): rpc.IRpcToken {
        return null;
    }

    onRunRemoteMethod: (respondToken: rpc.IRespondToken, methodName: string, result: smartObj.SmartObject) => void;
}
