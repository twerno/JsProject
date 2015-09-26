///<reference path="../rpc/IRpcController.ts"/>
///<reference path="../rpc/RpcController.ts"/>
///<reference path="RpcTask.ts"/>
///<reference path="../CommTypy.ts"/>
///<reference path="../Commons/AsyncTaskRunner.ts"/>
///<reference path="IRpcTask.ts"/>

class RpcTaskController extends rpc.RpcController<rpc.IJsonMetaData> implements IRpcTaskController {

    static CONTROLLER_NAME: string = 'RpcTaskController';

    constructor(rpcCommunicator: rpc.IRpcCommunicator, jsonRpcContent: rpc.IJsonRpcContent<IRpcTask>) {
        super(RpcTaskController.CONTROLLER_NAME, rpcCommunicator, jsonRpcContent);
    }

    registerTask(rpcTask: IRpcTask): rpc.IRpcToken {
        return null;
    }

    onRegisterTask: (respondToken: rpc.IRespondToken, rpcTask: IRpcTask) => void;

    unregisterTask(rpcTask: IRpcTask): rpc.IRpcToken {
        return null;
    }

    onUnregisterTask: (respondToken: rpc.IRespondToken, rpcTask: IRpcTask) => void;

    runRunRemoteMethod(methodName: string, result: rpc.IJsonMetaData): rpc.IRpcToken {
        return null;
    }

    onRunRemoteMethod: (respondToken: rpc.IRespondToken, methodName: string, result: rpc.IJsonMetaData) => void;
}
