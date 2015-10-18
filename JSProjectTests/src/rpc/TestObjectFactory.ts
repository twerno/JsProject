///<reference path="../../../JSProjectECMA6/dist/jsProject6.d.ts"/>


"use strict";

class TestConnectrProxy implements rpc6.IConnectorProxy {

    send(message: rpc6.IRpcMessage): void {
        this.onReceiveMessage(message);
    }

    onReceiveMessage: (message: rpc6.IRpcMessage) => void;

}

let rpcProxy_A: TestConnectrProxy = new TestConnectrProxy();
let rpcCommunicator_A: rpc6.IRpcCommunicator = new rpc6.RpcCommunicator(rpcProxy_A);


let rpcProxy_B: TestConnectrProxy = new TestConnectrProxy();
let rpcCommunicator_B: rpc6.IRpcCommunicator = new rpc6.RpcCommunicator(rpcProxy_B);


class TestController extends rpc6.CustomController {

    private CALL_TEST_RPC_METHOD = 'callTest';

    constructor() {
        super();

        this.registerRpcMethod(this.CALL_TEST_RPC_METHOD, new testMethod());
    }

    callTest(data: Object, onSuccess: asyncRunner6.AsyncTaskSuccess, onFailure: asyncRunner6.AsyncTaskFailure): void {
        rpcCommunicator_A.callRpc(this.getControllerName(), this.CALL_TEST_RPC_METHOD, null, 60 * 1000);
    }
}


class testMethod implements rpc6.ICustomControllerMethod {
    validate(data: Object): string[] {
        return null;
    }

    doWork(respondToken: rpc6.RespondToken, data: Object): void {
        rpcCommunicator_A.callResponse(respondToken, 'Respond: data');
    }
}

let onSuccess = function(result: Object): void {
    console.log(result, result);
}

let onError = function(error: Error): void {
    throw error;
}

let testController: TestController = new TestController();