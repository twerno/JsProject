"use strict";

namespace rpc {

    export type MessageId = string;
    export enum MessageType { MESSAGE, RESPONSE, ERROR }
    export interface IMessage {
        id: MessageId;
        rpcController: string;
        rpcMethod: string;
        messageType: MessageType;
        serializedContent: string;
        responseId: MessageId;
        timeLimit: number;
    }
    export enum TokenFailureCode  { ERROR, TIMEOUT } 
    export type TokenSuccessCallback = (token: RpcToken, result: Object) => void;
    export type TokenFailureCallback = (token: RpcToken, code: TokenFailureCode, error: Error) => void;



    export class RpcToken {
        get id(): MessageId { return this.id };

        onSuccess: TokenSuccessCallback;
        onFailure: TokenFailureCallback;

        constructor(private _id: MessageId) { }
    }


    export class RespondToken {
        get respondTo(): MessageId { return this._respondTo }

        constructor(private _respondTo: MessageId) { }
    }


    export interface ICommunicator {
        send(message: IMessage): void;

        onReceiveMessage :(message: IMessage) => void;
    }

    //export interface IRpcCommunicator extends IRpcControllerManager {
    //    
    //    
    //}


    //export interface IJsonRpcParser<T> {
    //    stringify(data: T | Error | string): string;
    //    parse(serializedData: string): T;
    //    parseError(serializedData: string): Error;
    //    parseString(serializedData: string): string;
    //}

    export interface ICustomController {
      getControllerName(): string;

      onRpcHandler(respondToken: RespondToken, rpcMethod: string, data: Object): void;
      //onRespondHandler(token: IRpcToken, data: Object): void;
    }


    export interface IRpcCommunicator {

        callRpc(rpcController: string, rpcMethod: string, data: Object, timeLimit?: number): RpcToken;
        callResponse(respondToken: RespondToken, data: Object): void;
        callError(respondToken: RespondToken, error: Error): void; 

        //onReceiveMessageHandler(message: IMessage): void;

        registerController(controller: ICustomController): void;
        getControllerByName(name: string): ICustomController;
        //newMessageId(): MessageId;

        //respondTo(respondToken: RespondToken, data: Object): void;

        ////

        
        //callRpc(rpcController: string, rpcMethod: string, data: Object, timeLimit?: number): IRpcToken;
        
        //callError(message: string, error?: Error, respondToken?: IRespondToken): void;
        //callTimeut(error: Error, respondToken?: IRespondToken): void;

        
        //onSuccessHandler(token: IRpcToken, result: Object): void;
        //onFailureHandler(token: IRpcToken, code: TokenFailureCode, message?: string, error?: Error): void;

        //onRpcCall: (respondToken: IRespondToken, rpcMethod: string, data: Object) => void;
        //onError

        //onError: (error: Error, token: IRpcToken) => void;
        //onTimeout: (msg: string, token: IRpcToken) => void;
    }

}