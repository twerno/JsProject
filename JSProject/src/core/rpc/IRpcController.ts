///<reference path="../CommTypy.ts"/>

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
    export type TokenSuccessCallback = (token: IRpcToken, result: IObjectMap) => void;
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

    export interface IJsonMetaData {
        getMetadata(): Object
    }

    export interface IRpcControllerManager {
        registerController(controller: IRpcController<IJsonMetaData>): void;
        getControllerByName(name: string): IRpcController<IJsonMetaData>;
    }



    export interface IRpcCommunicator extends IRpcControllerManager {
        newMessageId(): MessageId;
        send(message: IMessage): void;
    }


    export interface IJsonRpcContent<T extends IJsonMetaData> {
        stringify(content: T | Error | string): string;
        parse(serializedContent: string): T;
        parseError(serializedContent: string): Error;
        parseString(serializedContent: string): string;
    }



    export interface IRpcController<T extends IJsonMetaData> {
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