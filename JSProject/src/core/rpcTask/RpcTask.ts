///<reference path="../rpc/IRpcController.ts"/>
///<reference path="IRpcTask.ts"/>

///<reference path="../CommTypy.ts"/>
///<reference path="../Const.ts"/>
///<reference path="../Commons/AsyncTaskRunner.ts"/>

"use strict";

abstract class RpcTask extends smartObj.SmartObject implements IRpcTask {

    params: smartObj.SmartObject = null;
    controller: IRpcTaskController = null;
    callbacks: AsyncTaskCallbacks = { onSuccess: null, onError: null, onTimeout: null };
    asyncTaskState: AsyncTaskState = AsyncTaskState.NEW;
    name: string;

    abstract getNextMethod(): IRpcMethod; 
    abstract run(): void;

    getMetadata(): smartObj.ISmartObjectMemberMap {
        return {
            ['params']: smartObj.SmartObjectType.SMART_OBJECT,
            ['controller']: smartObj.SmartObjectType.IGNORED,
            ['callbacks']: smartObj.SmartObjectType.IGNORED,
            ['asyncTaskState']: smartObj.SmartObjectType.IGNORED,
            ['name']: smartObj.SmartObjectType.IGNORED,
        };
    }

}


//class SequentialRpcMethodQueueRpcTask implements IRpcTask {

//    static TASK_NAME: string = 'SequentialRpcMethodQueueRpcTask';

//    //RpcMethodQueue
//    protected methodQueue: IRpcMethod[] = [];


//    params: IObjectMap = null;
//    controller: IRpcTaskController = null;
//    callbacks: AsyncTaskCallbacks = { onSuccess: null, onError: null, onTimeout: null };

//    get name(): string { return SequentialRpcMethodQueueRpcTask.TASK_NAME }
//    get isWorking(): boolean { return this.asyncTaskState === AsyncTaskState.WORKING }
//    get asyncTaskState(): AsyncTaskState { return this._asyncTaskState }

//    toString(): string { return this.name }




//    getMetadata(): Object {
//        return null;
//    }



//    getNextMethod(): IRpcMethod {
//        return this.methodQueue.pop() || null;
//    }



//    run(): void {
//        if (this.asyncTaskState === AsyncTaskState.NEW) {
//            this._asyncTaskState = AsyncTaskState.WORKING;
//            this.runNextMethod();
//        } else
//            throw new Error(`[Task: ${this}] TaskState: ${this.asyncTaskState}`);
//    }



//    private currentMethod: IRpcMethod = null;
//    private _asyncTaskState: AsyncTaskState = AsyncTaskState.NEW;


//    private runNextMethod(): void {
//        if (!this.isWorking) return;

//        let method: IRpcMethod = this.getNextMethod();
//        if (method != null)
//            this.runMethod(method);
//        else {
//            this._asyncTaskState = AsyncTaskState.FINISHED_SUCCESS;
//            if (this.callbacks != null && this.callbacks.onSuccess != null)
//                this.callbacks.onSuccess(this);
//        }
//    }



//    private runMethod(method: IRpcMethod): void {
//        if (!this.isWorking) return;

//        this.currentMethod = method;

//        // run localy
//        let result: IObjectMap = null;
//        try {
//            result = method.local.run();
//        } catch (err) {
//            this.callError(err);
//        }

//        if (!this.isWorking) return;

//        //TODO result wlasciwego typu
//        let token: rpc.IRpcToken = this.controller.runRunRemoteMethod(method.name, null /* result */);
//        token.onSuccess = (token, result) => this.remoteMethodSuccessHandler(result);
//        token.onError = (error, token) => this.callError(error);
//        token.onTimeout = (msg, token) => this.callTimeout(`[Timeout] task: ${this}; method: ${this.currentMethod.name} with msg: "${msg}".`);
//    }



//    private remoteMethodSuccessHandler(result: IObjectMap): void {
//        if (!this.isWorking) return;

//        try {
//            this.currentMethod.local.remoteMethodSuccessHandler(result);
//        } catch (err) {
//            this.callError(err);
//        }

//        if (!this.isWorking) return;

//        this.currentMethod = null;
//        this.runNextMethod();
//    }



//    private callError(error: Error): void {
//        this._asyncTaskState = AsyncTaskState.FINISHED_ERROR;
//        if (this.callbacks != null && this.callbacks.onError != null)
//            this.callbacks.onError(this, error);
//    }



//    private callTimeout(msg: string): void {
//        this._asyncTaskState = AsyncTaskState.FINISHED_TIMEOUT;
//        if (this.callbacks != null && this.callbacks.onTimeout != null)
//            this.callbacks.onTimeout(this, msg);
//    }
//}