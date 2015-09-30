///<reference path="../Const.ts"/>
///<reference path="../CommTypy.ts"/>
///<reference path="IRpcController.ts"/>
///<reference path="../smartObject/SmartObject.ts"/>
///<reference path="../smartObject/SmartObjectSerializer.ts"/>
///<reference path="../smartObject/SmartObjectDeserializer.ts"/>

"use strict";

namespace rpc {

    interface ITokenMap { [key: string]: IRpcToken }
    interface IControllerMap { [key: string]: IRpcController<smartObj.SmartObject> }




    class RpcToken implements IRpcToken {
        get id(): MessageId { return this.id };

        onSuccess: TokenSuccessCallback;
        onError: TokenErrorCallback;
        onTimeout: TokenTimeoutCallback;

        constructor(private _id: MessageId) { }

        message: IMessage;
    }



    class RespondToken implements IRespondToken {
        get id(): MessageId { return this.id }
        get respondTo(): MessageId { return this._respondTo }

        constructor(private _id: MessageId, private _respondTo: MessageId) { }
    }



    export class RpcControllerManager implements IRpcControllerManager {

        private controllerMap: IControllerMap = {};

        registerController(controller: IRpcController<smartObj.SmartObject>): void {
            if (controller.name in this.controllerMap)
                throw new Error(`Controller ${controller.name} is already registered.`);

            this.controllerMap[controller.name] = controller;
        };

        getControllerByName(name: string): IRpcController<smartObj.SmartObject> {
            let result: IRpcController<smartObj.SmartObject> = this.controllerMap[name] || null;
            if (result === null)
                throw new Error(`Controller ${result.name} not found.`);

            return result;
        };
    }


    export class JsonRpcParser<T extends smartObj.SmartObject> implements IJsonRpcParser<smartObj.SmartObject> {

        constructor (private serializer: smartObj.SmartObjectSerializer, 
            private deserializer: smartObj.SmartObjectDeserializer<T>) {}

        stringify(data: T | Error | string): string {
            if (typeof data === 'string')
                return JSON.stringify(data);
            
            else if (data instanceof Error)
                return JSON.stringify(data);

            else if (data instanceof smartObj.SmartObject)
                return this.serializer.serialize(data);

            else
                throw new Error(`Not valid parametr type: ${data}.`);
        }

        parse(serializedData: string): T {
            return this.deserializer.deserialize(serializedData);
        }


        parseError(serializedData: string): Error {
            return <Error>JSON.parse(serializedData);
        }


        parseString(serializedData: string): string {
            return JSON.parse(serializedData);
        }
    }


	/**
	 *  RpcController
	 */
    export class RpcController<T extends smartObj.SmartObject> implements IRpcController<smartObj.SmartObject> {
        private tokenMap: ITokenMap = {};

        onRpcCall: (respondToken: IRespondToken, rpcMethod: string, data: T) => void;
        onRespond: (token: IRpcToken, data: T) => void;
        onTimeout: (msg: string, token: IRpcToken) => void;
        onError: (error: Error, token: IRpcToken) => void;



        constructor(public name: string, private rpcCommunicator: IRpcCommunicator, private jsonParser: JsonRpcParser<T>) {
            this.rpcCommunicator.registerController(this);
        }



        callRpc(rpcMethod: string, data: T, timeout?: number): IRpcToken {
            let token: RpcToken = this.buildToken();

            let message: IMessage = {
                id: token.id,
                rpcController: this.name,
                rpcMethod: rpcMethod,
                messageType: MessageType.MESSAGE,
                serializedContent: this.jsonParser.stringify(data),
                respondTo: undefined
            }

            token.message = message;
            this.sendAsync(message);

            return token;
        }



        respondTo(respondToken: IRespondToken, data: T): void {

            let message: IMessage = {
                id: this.rpcCommunicator.newMessageId(),
                rpcController: this.name,
                rpcMethod: '',
                messageType: MessageType.MESSAGE,
                serializedContent: this.jsonParser.stringify(data),
                respondTo: respondToken.respondTo
            }

            this.sendAsync(message);
        }



        callError(error: Error, respondToken?: IRespondToken): void {
            let message: IMessage = {
                id: this.rpcCommunicator.newMessageId(),
                rpcController: this.name,
                rpcMethod: '',
                messageType: MessageType.ERROR,
                serializedContent: this.jsonParser.stringify(error),
                respondTo: (respondToken || null) != null ? respondToken.respondTo : undefined
            };

            this.sendAsync(message);
        }



        callTimeut(msg: string, respondToken?: IRespondToken): void {
            let message: IMessage = {
                id: this.rpcCommunicator.newMessageId(),
                rpcController: this.name,
                rpcMethod: '',
                messageType: MessageType.TIMEOUT,
                serializedContent: this.jsonParser.stringify(msg),
                respondTo: (respondToken || null) != null ? respondToken.respondTo : undefined
            };

            this.sendAsync(message);
        }



        public onReceive(message: IMessage): void {
            if ((message || null) === null)
                throw new Error('message is null');

            if (message.messageType = MessageType.MESSAGE) {
                let messageData: T = this.jsonParser.parse(message.serializedContent);

                if ((message.respondTo || null) === null) { //message
                    let respondToken: RespondToken = new RespondToken(this.rpcCommunicator.newMessageId(), message.id);

                    this.onRpcCall === null || this.onRpcCall(respondToken, message.rpcMethod, messageData);
                }
                else  //respond
                    this.onRespond === null || this.onRespond(this.getToken(message.id), messageData);

            } else if (message.messageType = MessageType.ERROR) {

                let error: Error = this.jsonParser.parseError(message.serializedContent);
                let token: IRpcToken = (message.respondTo || null) === null ? null : this.getToken(message.id);
                this.onError === null || this.onError(error, token);

            } else if (message.messageType = MessageType.TIMEOUT) {

                let msg: string = this.jsonParser.parseString(message.serializedContent);
                let token: IRpcToken = (message.respondTo || null) === null ? null : this.getToken(message.id);
                this.onTimeout === null || this.onTimeout(msg, token);

            } else
                throw new Error(`Unknown message type: "${message.messageType}"`);
        }



        private getToken(id: MessageId): RpcToken {
            let result: IRpcToken = this.tokenMap[id] || null;

            if (result instanceof RpcToken)
                return result;
            else
                throw new Error(`Unknown rpcToken (${id}).`);
        }



        private buildToken(): RpcToken {
            let token: RpcToken = new RpcToken(this.rpcCommunicator.newMessageId());
            this.tokenMap[token.id] = token;
            return token;
        }



        private sendAsync(message: IMessage): void {
            setTimeout(() => this.rpcCommunicator.send(message), Const.DEFAULT_ASYNC_DELAY);
        }
    }
}