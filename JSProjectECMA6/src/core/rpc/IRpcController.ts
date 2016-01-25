"use strict";

namespace rpc6 {

    export type RequestID = string;
    export enum RequestType { MESSAGE, RESPONSE, ERROR }
    export interface IRpcMessage {
        id: RequestID;
        requestType: RequestType;
        respondingTo: RequestID;
        rpcController: string;
        rpcMethod: string;
        serializedContent: string;
    }
    export enum TokenFailureCode { ERROR, TIMEOUT }
    export type TokenSuccessCallback = (token: RpcToken, result: Object) => void;
    export type TokenFailureCallback = (token: RpcToken, code: TokenFailureCode, error: Error) => void;



    export class RpcToken {
        get id(): RequestID { return this._id };

        onSuccess: TokenSuccessCallback;
        onFailure: TokenFailureCallback;

        constructor(private _id: RequestID) { }
    }


    export class RespondToken {
        get respondTo(): RequestID { return this._respondTo }

        constructor(private _respondTo: RequestID) { }
    }


    export interface IConnectorProxy {
        send(message: IRpcMessage): void;

        onReceiveMessage: (message: IRpcMessage) => void;
    }


    export interface ICustomControllerMethod {
        validate(data: Object): string[];
        doWork(respondToken: RespondToken, data: Object): void;
    }

    export interface ICustomController {
        getControllerName(): string;

        getRpcMethod(rpcMethodName: string): ICustomControllerMethod;
        //onRpcHandler(respondToken: RespondToken, rpcMethod: string, data: Object): void;
        //onRespondHandler(token: IRpcToken, data: Object): void;
    }


    export interface IRpcCommunicator {

        callRpc(rpcController: string, rpcMethod: string, data: Object, timeLimit?: number): RpcToken;
        callResponse(respondToken: RespondToken, data: Object): void;
        callError(respondToken: RespondToken, error: Error): void;


        registerController(controller: ICustomController): void;
        getControllerByName(name: string): ICustomController;
    }

}