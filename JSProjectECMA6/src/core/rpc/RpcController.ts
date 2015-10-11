///<reference path="../Const.ts"/>
/////<reference path="../CommTypy.ts"/>
///<reference path="IRpcController.ts"/>


"use strict";

namespace rpc {

    
    interface IControllerMap { [key: string]: ICustomController }

    enum TokenState { NEW, WORKING, FINISHED, FAILED_ERROR, FAILED_TIMEOUT  }
    interface IRpcTokenMeta {
        id: MessageId;
        token: RpcToken;
        timeLimit: number;
        timeoutHandler: number;
        state: TokenState;
    }
    interface TokenMetaMap { [key: string]: IRpcTokenMeta }




	///**
	// *  RpcController
	// *
    export class RpcCommunicator implements IRpcCommunicator {
        
        private tokenMetaMap: TokenMetaMap = {};
        private numerator: number = 0;


        constructor(private communicator: ICommunicator) {
            this.communicator.onReceiveMessage = (message: IMessage) => { this.onReceiveMessageHandler(message) }
        }



        callRpc(rpcController: string, rpcMethod: string, data: Object, timeLimit?: number): RpcToken {
            let tokenMeta: IRpcTokenMeta = this.buildToken(timeLimit); 

            let message: IMessage = {
                id: tokenMeta.id,
                rpcController: this.getControllerByName(rpcController).getControllerName(),
                rpcMethod: rpcMethod,
                messageType: MessageType.MESSAGE,
                serializedContent: JSON.stringify(data),
                responseId: undefined,
                timeLimit: timeLimit
            }

            this._sendMessage(message);

            return tokenMeta.token;
        }




        callResponse(respondToken: RespondToken, data: Object): void {

            let message: IMessage = {
                id: this.newMessageId(),
                rpcController: '',
                rpcMethod: '',
                messageType: MessageType.RESPONSE,
                serializedContent: JSON.stringify(data),
                responseId: respondToken.respondTo,
                timeLimit: undefined
            }

            this._sendMessage(message);
        }



        callError(respondToken: RespondToken, error: Error): void {

            let message: IMessage = {
                id: this.newMessageId(),
                rpcController: '',
                rpcMethod: '',
                messageType: MessageType.ERROR,
                serializedContent: JSON.stringify(error),
                responseId: respondToken.respondTo,
                timeLimit: undefined
            }

            this._sendMessage(message);
        }



        private onReceiveMessageHandler(message: IMessage): void {
            if ((message || null) === null)
                throw new Error('message is null');

            // log

            if (message.messageType = MessageType.MESSAGE) {
                let messageData: Object = JSON.parse(message.serializedContent);
                let controller: ICustomController = this.getControllerByName(message.rpcController);

                controller.onRpcHandler(new RespondToken(message.id), message.rpcMethod, messageData);

            } else if (message.messageType = MessageType.RESPONSE) {

                this._onReceiveResponseHandler(message);


            } else if (message.messageType = MessageType.ERROR) {
                let token: RpcToken = this.getToken(message.responseId);
                let error: Error = <Error> JSON.parse(message.serializedContent);

                token.onFailure(token, TokenFailureCode.ERROR, error);

            } else
                throw new Error(`Unknown message type: "${message.messageType}"`);
        }


        private _onReceiveResponseHandler(message: IMessage): void {
            let tokenMeta: IRpcTokenMeta = this.getToken(message.responseId);

            if (tokenMeta.state != TokenState.WORKING)
                throw new Error(`[RpcToken] wrong state; current state ${TokenState[tokenMeta.state]} does not equal ${TokenState[TokenState.WORKING]}`);

            let token: RpcToken = tokenMeta.token;
            let messageData: Object = JSON.parse(message.serializedContent);

            try {
                token.onSuccess(token, messageData);
            } catch (error) {
            }
        }



        private getToken(id: MessageId): IRpcTokenMeta {
            let result: IRpcTokenMeta = this.tokenMetaMap[id] || null;

            if (result)
                return result;
            else
                throw new Error(`Unknown rpcToken (${id}).`);
        }



        private buildToken(timeLimit: number): IRpcTokenMeta {

            let token: RpcToken = new RpcToken(this.newMessageId());
            let tokenMeta: IRpcTokenMeta = {
                id : token.id,
                token : token,
                timeLimit: timeLimit || 0,
                timeoutHandler: undefined,
                state: TokenState.NEW
            }

            
            this.tokenMetaMap[tokenMeta.id] = tokenMeta;
            return tokenMeta;
        }



        private newMessageId(): MessageId {
            return (this.numerator++).toString();
        }



        private controllerMap: IControllerMap = {};

        registerController(controller: ICustomController): void {
            if (controller.getControllerName() in this.controllerMap)
                throw new Error(`Controller ${controller.getControllerName()} is already registered.`);

            this.controllerMap[controller.getControllerName()] = controller;
        };

        getControllerByName(name: string): ICustomController {
            let result: ICustomController = this.controllerMap[name] || null;
            if (result === null)
                throw new Error(`Controller ${result.getControllerName()} not found.`);

            return result;
        };


      
        private _sendMessage(message: IMessage): void {

            setTimeout(() => this.rpcCommunicator.send(message), Const.DEFAULT_ASYNC_DELAY);
        } 

    }


    class SendMessageTask extends asyncRunner.IAsyncTask {

        run(onSuccess: asyncRunner.AsyncTaskSuccess, onFailure: asyncRunner.AsyncTaskFailure): void {
        }
    }
}