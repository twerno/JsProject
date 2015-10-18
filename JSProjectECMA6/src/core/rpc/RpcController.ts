///<reference path="../Const.ts"/>
/////<reference path="../CommTypy.ts"/>
///<reference path="IRpcController.ts"/>
///<reference path="../Utils.ts"/>


"use strict";

namespace rpc6 {


    interface IControllerMap { [key: string]: ICustomController }

    enum RpcRequestState { NEW, WORKING, FINISHED, FAILED_ERROR, FAILED_TIMEOUT }

    interface IRequestMeta {
        id: RequestID;
        rpcController: string;
        rpcMethod: string;
        token: RpcToken;
        timeLimit: number;
        timeoutHandler: number;
        state: RpcRequestState;
    }
    interface RpcRequestMap { [key: string]: IRequestMeta }




    ///**
    // *  RpcController
    // *
    export class RpcCommunicator implements IRpcCommunicator {
        private rpcRequestMap: RpcRequestMap = {};
        private numerator: number = 0;


        constructor(private connectorProxy: IConnectorProxy) {
            this.connectorProxy.onReceiveMessage = (message: IRpcMessage) => { this.onReceiveMessageHandler(message) }
        }



        callRpc(rpcController: string, rpcMethod: string, data: Object, timeLimit?: number): RpcToken {

            this.getValidateRpcMethod(rpcController, rpcMethod, data);

            let requestMeta: IRequestMeta =
                this.buildRequest(
                    this.getControllerByName(rpcController).getControllerName(),
                    rpcMethod, timeLimit);

            let request: IRpcMessage = {
                id: requestMeta.id,
                rpcController: rpcController,
                rpcMethod: rpcMethod,
                requestType: RequestType.MESSAGE,
                serializedContent: JSON.stringify(data),
                respondingTo: undefined
            }

            setTimeout((): void => { this._sendRequest(requestMeta, request) }, Const.DEFAULT_ASYNC_DELAY);
            return requestMeta.token;
        }


        callResponse(respondToken: RespondToken, data: Object): void {

            let request: IRpcMessage = {
                id: this.newMessageId(),
                rpcController: '',
                rpcMethod: '',
                requestType: RequestType.RESPONSE,
                serializedContent: JSON.stringify(data),
                respondingTo: respondToken.respondTo
            }

            setTimeout((): void => { this._sendRequest(null, request) }, Const.DEFAULT_ASYNC_DELAY);
        }


        callError(respondToken: RespondToken, error: Error): void {

            let request: IRpcMessage = {
                id: this.newMessageId(),
                rpcController: '',
                rpcMethod: '',
                requestType: RequestType.ERROR,
                serializedContent: JSON.stringify(error),
                respondingTo: respondToken.respondTo
            }

            setTimeout((): void => { this._sendRequest(null, request) }, Const.DEFAULT_ASYNC_DELAY);
        }


        private getValidateRpcMethod(rpcControllerName: string, rpcMethodName: string, messageData: Object): ICustomControllerMethod {
            let controller: ICustomController = this.getControllerByName(rpcControllerName);
            let rpcMethod: ICustomControllerMethod = controller.getRpcMethod(rpcMethodName);
            if (!rpcMethod)
                throw new Error(`Unknown rpcMethod: ${rpcMethodName}; Controller: ${rpcControllerName}`);

            let errors: string[] = rpcMethod.validate(messageData);
            if (errors && errors.length > 0)
                throw new Error(`[Controller: ${rpcControllerName}; rpcMethod: ${rpcMethodName}]\n ${errors.join(';') }`);

            return rpcMethod;
        }


        private onReceiveMessageHandler(message: IRpcMessage): void {
            if ((message || null) === null)
                throw new Error('message is null');

            // log
            
            if (message.requestType = RequestType.MESSAGE) {
                let messageData: Object = JSON.parse(message.serializedContent);
                let rpcMethod: ICustomControllerMethod = this.getValidateRpcMethod(message.rpcController, message.rpcMethod, messageData);

                rpcMethod.doWork(new RespondToken(message.id), messageData);

            } else if (message.requestType = RequestType.RESPONSE)
                this._onReceiveResponseHandler(message);

            else if (message.requestType = RequestType.ERROR)
                this._onReceiveErrorHandler(message);

            else
                throw new Error(`Unknown message type: "${message.requestType}"`);
        }


        private _onReceiveResponseHandler(message: IRpcMessage): void {
            let request: IRequestMeta = this.getToken(message.respondingTo);

            clearTimeout(request.timeoutHandler);

            if (request.state != RpcRequestState.WORKING) {
                request.state = RpcRequestState.FAILED_ERROR;
                throw new Error(`[RpcToken] requests state ${RpcRequestState[request.state]}; should be ${RpcRequestState[RpcRequestState.WORKING]}`);
            }

            request.state = RpcRequestState.FINISHED;

            let token: RpcToken = request.token;
            let messageData: Object = JSON.parse(message.serializedContent);

            token.onSuccess(token, messageData);
        }


        private _onReceiveErrorHandler(message: IRpcMessage): void {
            let request: IRequestMeta = this.getToken(message.respondingTo);

            clearTimeout(request.timeoutHandler);

            if (request.state != RpcRequestState.WORKING) {
                request.state = RpcRequestState.FAILED_ERROR;
                throw new Error(`[RpcToken] requests state ${RpcRequestState[request.state]}; should be ${RpcRequestState[RpcRequestState.WORKING]}`);
            }

            request.state = RpcRequestState.FAILED_ERROR;

            let token: RpcToken = request.token;
            let error: Error = <Error> JSON.parse(message.serializedContent);

            token.onFailure(token, TokenFailureCode.ERROR, error);
        }



        private getToken(id: RequestID): IRequestMeta {
            let result: IRequestMeta = this.rpcRequestMap[id] || null;

            if (result)
                return result;
            else
                throw new Error(`Unknown rpcToken (${id}).`);
        }



        private buildRequest(rpcController: string, rpcMethod: string, timeLimit: number): IRequestMeta {

            let token: RpcToken = new RpcToken(this.newMessageId());
            let request: IRequestMeta = {
                id: token.id,
                rpcController: rpcController,
                rpcMethod: rpcMethod,
                token: token,
                timeLimit: timeLimit || 0,
                timeoutHandler: undefined,
                state: RpcRequestState.NEW
            }

            this.rpcRequestMap[request.id] = request;
            return request;
        }



        private newMessageId(): RequestID {
            return (this.numerator++).toString();
        }



        private controllerMap: IControllerMap = {};

        registerController(controller: ICustomController): void {
            if (controller.getControllerName() in this.controllerMap)
                throw new Error(`Controller ${controller.getControllerName() } is already registered.`);

            this.controllerMap[controller.getControllerName()] = controller;
        };

        getControllerByName(name: string): ICustomController {
            let result: ICustomController = this.controllerMap[name] || null;
            if (result === null)
                throw new Error(`Controller ${result.getControllerName() } not found.`);

            return result;
        };



        private _sendRequest(requestMeta: IRequestMeta, request: IRpcMessage): void {
            try {
                if (requestMeta) {
                    requestMeta.state = RpcRequestState.WORKING;
                    (requestMeta.timeLimit || 0) > 0 && setTimeout((): void => {

                        requestMeta.state = RpcRequestState.FAILED_TIMEOUT;
                        requestMeta.token.onFailure(requestMeta.token, TokenFailureCode.TIMEOUT,
                            new Error(`[TIMEOUT (limit=${requestMeta.timeLimit})] `
                                + `Controller: ${requestMeta.rpcController}, `
                                + `method: ${requestMeta.rpcMethod}.`));

                    }, requestMeta.timeLimit);
                }

                this.connectorProxy.send(request);
            } catch (error) {
                if (requestMeta) {
                    requestMeta.state = RpcRequestState.FAILED_ERROR;
                    requestMeta.token.onFailure(requestMeta.token, TokenFailureCode.ERROR, error);
                }
                else
                    throw error;
            }
        }
    }


    interface ICustomControllerMethodMap { [key: string]: ICustomControllerMethod }

    export class CustomController implements ICustomController {

        //constructor(dummy: string) {}

        private methodsMap: ICustomControllerMethodMap = {};

        getControllerName(): string {
            return Utils.getNameOfClass(this);
        }

        protected registerRpcMethod(rpcMethodName: string, method: ICustomControllerMethod): void {
            this.methodsMap[rpcMethodName] = method;
        }

        getRpcMethod(rpcMethodName: string): ICustomControllerMethod {
            return this.methodsMap[rpcMethodName] || null;
        }
    }
}