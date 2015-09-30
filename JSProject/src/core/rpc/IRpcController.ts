///<reference path="../CommTypy.ts"/>
///<reference path="../smartObject/SmartObject.ts"/>

"use strict";

namespace rpc {

    export type MessageId = string;
    export enum MessageType { MESSAGE, ERROR, TIMEOUT }
    export interface IMessage {
        id: MessageId;
        rpcController: string;
        rpcMethod: string;
        messageType: MessageType,
        serializedContent: string,
        respondTo?: MessageId
    }
    export type TokenSuccessCallback = (token: IRpcToken, result: smartObj.SmartObject) => void;
    export type TokenErrorCallback = (error: Error, token: IRpcToken) => void;
    export type TokenTimeoutCallback = (msg: string, token: IRpcToken) => void;



    export interface IRpcToken {
        id: MessageId;

        onSuccess: TokenSuccessCallback;
        onError: TokenErrorCallback;
        onTimeout: TokenTimeoutCallback;
    }



    export interface IRespondToken {
        id: MessageId;
        respondTo: MessageId;
    }



    export interface IRpcControllerManager {
        registerController(controller: IRpcController<smartObj.SmartObject>): void;
        getControllerByName(name: string): IRpcController<smartObj.SmartObject>;
    }



    export interface IRpcCommunicator extends IRpcControllerManager {
        newMessageId(): MessageId;
        send(message: IMessage): void;
    }


    export interface IJsonRpcParser<T extends smartObj.SmartObject> {
        stringify(data: T | Error | string): string;
        parse(serializedData: string): T;
        parseError(serializedData: string): Error;
        parseString(serializedData: string): string;
    }


    export interface IRpcController<T extends smartObj.SmartObject> {
        name: string;

        callRpc(rpcMethod: string, data: T, timeout?: number): IRpcToken;
        onReceive(message: IMessage): void;
        onRpcCall: (respondToken: IRespondToken, rpcMethod: string, data: T) => void;

        respondTo(respondToken: IRespondToken, data: T): void;
        onRespond: (token: IRpcToken, data: T) => void;

        callError(error: Error, respondToken?: IRespondToken): void;
        onError: (error: Error, token: IRpcToken) => void;

        callTimeut(msg: string, respondToken?: IRespondToken): void;
        onTimeout: (msg: string, token: IRpcToken) => void;
    }

}