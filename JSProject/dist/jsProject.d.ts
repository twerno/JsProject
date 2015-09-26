/// <reference path="../src/lib/RTCPeerConnection.d.ts" />
declare enum ActionType {
    WORKER = 0,
    SUB_ACTION = 1,
    REMOTE_WORKER = 2,
}
interface IAction {
    id: string;
    parent: IAction;
    actionType: ActionType;
    isFinished: boolean;
    nextSubAction(): IAction;
    applyResult(result: Object): void;
    params: Object;
    result: Object;
    doWork(): void;
}
declare const enum AsyncTaskState {
    NEW = 0,
    WORKING = 1,
    FINISHED_SUCCESS = 2,
    FINISHED_ERROR = 3,
    FINISHED_TIMEOUT = 4,
    FINISHED_KILLED = 5,
}
declare type AsyncTaskSuccess = (task: IAsyncTask) => void;
declare type AsyncTaskError = (task: IAsyncTask, error: Error) => void;
declare type AsyncTaskTimeout = (task: IAsyncTask, msg: string) => void;
interface AsyncTaskCallbacks {
    onSuccess: AsyncTaskSuccess;
    onError: AsyncTaskError;
    onTimeout: AsyncTaskTimeout;
}
interface IAsyncTask {
    asyncTaskState: AsyncTaskState;
    callbacks: AsyncTaskCallbacks;
    run(): void;
}
declare class AsyncTaskRunner<T extends IAsyncTask> {
    private task;
    private onSuccess;
    private onError;
    private onTimeout;
    private timeout;
    private timeoutHandler;
    constructor(task: T, onSuccess: (task: T) => void, onError: (task: T, error: Error) => void, onTimeout: (task: T, msg: string) => void, timeout?: number);
    runAsync(): void;
    kill(): void;
    private internalOnSuccess();
    private internalOnTimeout1();
    private internalOnTimeout2(msg);
    private internalOnError(error);
    private cleanUp();
    private clearTasksCallbacks(task);
}
declare class AsyncMethodWrapperTask implements IAsyncTask {
    private worker;
    asyncTaskState: AsyncTaskState;
    callbacks: AsyncTaskCallbacks;
    run(): void;
    constructor(worker: () => void);
}
declare class AsyncMethodRunner {
    private asyncRunner;
    constructor(worker: () => void, onSuccess: (task: IAsyncTask) => void, onError: (task: IAsyncTask, error: Error) => void, onTimeout: (task: IAsyncTask, msg: string) => void, timeout?: number);
    runAsync(): void;
    kill(): void;
}
interface IObjectMap {
    [key: string]: Object;
}
declare namespace Const {
    const WORKER_TIMEOUT_LOCAL: number;
    const RPC_TASK_TIMEOUT: number;
    const DEFAULT_ASYNC_DELAY: number;
}
declare enum TaskState {
    SUCCESS = 0,
    FAILURE = 1,
    CANCEL = 2,
    UNKNOWN = 3,
}
declare type IResultCallback = (result: Object) => void;
declare type IErrorCallback = (error: Error) => void;
declare type ITaskSucceessHandler = (task: ITask, result: ITaskResult) => void;
declare type ITaskErrorHandler = (task: ITask, error: Error) => void;
declare type ITaskHandler = (task: ITask) => void;
declare type ITaskAsyncWorker = (self: ITask, onSuccess: IResultCallback, onError: IErrorCallback) => void;
interface ITask {
    asyncWorker: ITaskAsyncWorker;
    applyResult(result: Object): void;
}
interface ITaskRunner {
    runAsync(): void;
}
interface ITaskResult {
    task_state: TaskState;
}
declare class TaskRunner implements ITaskRunner {
    private _task;
    private _timeoutHandler;
    private _timeout;
    private _onSuccess;
    private _onError;
    private _onTimeout;
    constructor(task: ITask, onSuccess: ITaskSucceessHandler, onError: ITaskErrorHandler, onTimeout: ITaskHandler, timeout: number);
    runAsync(): void;
    private dispose();
    private _internalOnSuccess;
    private _internalOnError;
    private _internalOnTimeout;
}
declare namespace rpc {
    type MessageId = string;
    enum MessageType {
        MESSAGE = 0,
        ERROR = 1,
        TIMEOUT = 2,
    }
    interface IMessage {
        id: MessageId;
        rpcController: string;
        rpcMethod: string;
        messageType: MessageType;
        serializedContent: string;
        respondTo?: MessageId;
    }
    type TokenSuccessCallback = (token: IRpcToken, result: IObjectMap) => void;
    type TokenErrorCallback = (error: Error, token: IRpcToken) => void;
    type TokenTimeoutCallback = (msg: string, token: IRpcToken) => void;
    interface IRpcToken {
        id: MessageId;
        onSuccess: TokenSuccessCallback;
        onError: TokenErrorCallback;
        onTimeout: TokenTimeoutCallback;
    }
    interface IRespondToken {
        id: MessageId;
        respondTo: MessageId;
    }
    interface IJsonMetaData {
        getMetadata(): Object;
    }
    interface IRpcControllerManager {
        registerController(controller: IRpcController<IJsonMetaData>): void;
        getControllerByName(name: string): IRpcController<IJsonMetaData>;
    }
    interface IRpcCommunicator extends IRpcControllerManager {
        newMessageId(): MessageId;
        send(message: IMessage): void;
    }
    interface IJsonRpcContent<T extends IJsonMetaData> {
        stringify(content: T | Error | string): string;
        parse(serializedContent: string): T;
        parseError(serializedContent: string): Error;
        parseString(serializedContent: string): string;
    }
    interface IRpcController<T extends IJsonMetaData> {
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
declare namespace rpc {
    class RpcControllerManager implements IRpcControllerManager {
        private controllerMap;
        registerController(controller: IRpcController<IJsonMetaData>): void;
        getControllerByName(name: string): IRpcController<IJsonMetaData>;
    }
    class JsonRpcContent<T extends IJsonMetaData> implements IJsonRpcContent<IJsonMetaData> {
        stringify(content: T): string;
        parse(serializedContent: string): T;
        stringifyError(content: Error): string;
        parseError(serializedContent: string): Error;
        parseString(serializedContent: string): string;
    }
    class RpcController<T extends IJsonMetaData> implements IRpcController<IJsonMetaData> {
        name: string;
        private rpcCommunicator;
        private jsonRpcContent;
        private tokenMap;
        onRpcCall: (respondToken: IRespondToken, rpcMethod: string, data: T) => void;
        onRespond: (token: IRpcToken, data: T) => void;
        onTimeout: (msg: string, token: IRpcToken) => void;
        onError: (error: Error, token: IRpcToken) => void;
        constructor(name: string, rpcCommunicator: IRpcCommunicator, jsonRpcContent: IJsonRpcContent<T>);
        callRpc(rpcMethod: string, data: T, timeout?: number): IRpcToken;
        respondTo(respondToken: IRespondToken, data: T): void;
        callError(error: Error, respondToken?: IRespondToken): void;
        callTimeut(msg: string, respondToken?: IRespondToken): void;
        onReceive(message: IMessage): void;
        private getToken(id);
        private buildToken();
        private sendAsync(message);
    }
}
declare class SequentialRpcMethodQueueRpcTask implements IRpcTask {
    static TASK_NAME: string;
    protected methodQueue: IRpcMethod[];
    params: IObjectMap;
    controller: IRpcTaskController;
    callbacks: AsyncTaskCallbacks;
    name: string;
    isWorking: boolean;
    asyncTaskState: AsyncTaskState;
    toString(): string;
    getMetadata(): Object;
    getNextMethod(): IRpcMethod;
    run(): void;
    private currentMethod;
    private _asyncTaskState;
    private runNextMethod();
    private runMethod(method);
    private remoteMethodSuccessHandler(result);
    private callError(error);
    private callTimeout(msg);
}
interface IRpcTaskController extends rpc.IRpcController<IRpcTask> {
    registerTask(rpcTask: IRpcTask): rpc.IRpcToken;
    onRegisterTask: (respondToken: rpc.IRespondToken, rpcTask: IRpcTask) => void;
    runRunRemoteMethod(methodName: string, result: rpc.IJsonMetaData): rpc.IRpcToken;
    onRunRemoteMethod: (respondToken: rpc.IRespondToken, methodName: string, result: rpc.IJsonMetaData) => void;
    unregisterTask(rpcTask: IRpcTask): rpc.IRpcToken;
    onUnregisterTask: (respondToken: rpc.IRespondToken, rpcTask: IRpcTask) => void;
}
interface IRpcTask extends IAsyncTask, rpc.IJsonMetaData {
    controller: IRpcTaskController;
    name: string;
    params: IObjectMap;
    getNextMethod(): IRpcMethod;
}
interface IRpcMethod {
    name: string;
    parent: IRpcTask;
    local: IRpcLocalMethod;
    remote: IRpcRemoteMethod;
}
interface IRpcLocalMethod {
    parent: IRpcMethod;
    run(): IObjectMap;
    remoteMethodSuccessHandler(result: IObjectMap): void;
}
interface IRpcRemoteMethod {
    parent: IRpcMethod;
    run(dataMap: IObjectMap): IObjectMap;
}
declare class RpcTaskController extends rpc.RpcController<rpc.IJsonMetaData> implements IRpcTaskController {
    static CONTROLLER_NAME: string;
    constructor(rpcCommunicator: rpc.IRpcCommunicator, jsonRpcContent: rpc.IJsonRpcContent<IRpcTask>);
    registerTask(rpcTask: IRpcTask): rpc.IRpcToken;
    onRegisterTask: (respondToken: rpc.IRespondToken, rpcTask: IRpcTask) => void;
    unregisterTask(rpcTask: IRpcTask): rpc.IRpcToken;
    onUnregisterTask: (respondToken: rpc.IRespondToken, rpcTask: IRpcTask) => void;
    runRunRemoteMethod(methodName: string, result: rpc.IJsonMetaData): rpc.IRpcToken;
    onRunRemoteMethod: (respondToken: rpc.IRespondToken, methodName: string, result: rpc.IJsonMetaData) => void;
}
declare namespace smartObj {
    enum SmartObjectType {
        STRING = 0,
        NUMBER = 1,
        SMART_OBJECT = 2,
        SMART_OBJECT_COLLECTION = 3,
        COLLECTION = 4,
    }
    interface ISmartObjectMemberMap {
        [member: string]: SmartObjectType;
    }
    namespace internal {
        enum SmartObjectFlag {
            NONE = 0,
            IS_NULL = 1,
            IS_UNDEFINED = 2,
            IS_REF = 3,
        }
        interface ISmartObjectMap {
            [id: string]: SmartObject;
        }
        interface ISmartObjectData {
            id?: string;
            type: SmartObjectType;
            flag: SmartObjectFlag;
            clazz?: string;
            jsonData?: string;
            members?: {
                [key: string]: ISmartObjectData;
            };
        }
        class SmartObjectHelper {
            static validateSmartObjId(smartObjId: string): void;
            static validateDuplicateId(smartObj: SmartObject, smartObjCache: internal.ISmartObjectMap): void;
        }
    }
    class SmartObjectBuilder {
        private map;
        register(clazz: string, prototype: Object): void;
        build(clazz: string): SmartObject;
        private validateClazz(clazz);
        private validatePrototype(clazz, prototype);
    }
    class SmartObject {
        id: string;
        getMetadata(): ISmartObjectMemberMap;
        clazz(): string;
    }
}
declare namespace smartObj {
    class SmartObjectDeserializer<T extends SmartObject> {
        private builder;
        private smartObjCache;
        private smartObjRef2Fill;
        constructor(builder: SmartObjectBuilder);
        deserialize(serializedObj: string): T;
        private getAsSmartObject(data);
        private getOrCreateSmartObject(data);
        private fillRef(smartObj, data);
        private members2SmartObject(data, obj2Fill);
        private isEmpty(data);
        private getAsEmpty(data);
        private getAsString(data);
        private getAsNumber(data);
        private getAsSmartObjectCollection(data);
        private getAsCollection(data);
        private areAllSmartObjectFilled();
    }
}
declare namespace smartObj {
    class SmartObjectSerializer {
        private smartObjCache;
        serialize(smart: SmartObject): string;
        private string2Data(value);
        private number2Data(value);
        private smartObj2Data(smartObj);
        private smartObj2DataFillMembers(smartObj, result);
        private getFromCache(smartObj);
        private putIntoCache(smartObj);
        private smartCollection2Data(collection);
        private collection2Data(collection);
        private getEmptySmartObjData(emptyObject, smartObjectType);
    }
}
interface IWebRtcConnectionData {
    RTCSessionDescription?: RTCSessionDescription;
    RTCIceCandidate?: RTCIceCandidate;
}
interface IWebRtcConnectionDataCallback {
    (data: IWebRtcConnectionData): void;
}
declare class WebRtcConnectionInitializationError {
    message: string;
    name: string;
    constructor(message: string);
}
declare class WebRtcConnectionNotInitializedError {
    message: string;
    name: string;
    constructor(message: string);
}
interface IWebRtcCommunicatorData extends IWebRtcConnectionData {
    pass2: string;
}
interface FWebRtcCommunicatorDataCallback {
    (data: IWebRtcCommunicatorData): void;
}
declare class EWebRtcConfigureTimeout {
}
declare class WebRtcProducer {
    private _id;
    private _debugMode;
    private _successCalled;
    private connection;
    private channel;
    private _onPassDataToPeer;
    private _onConnectionSucces;
    private _onConnectionError;
    private _config;
    constructor(servers: RTCIceServer[], _id?: string, _debugMode?: boolean);
    setCallbacks(onPassDataToPeer: IWebRtcConnectionDataCallback, onConnectionSucces: () => void, onConnectionError: (error: Object) => void): void;
    isConnected(): boolean;
    configure(data: IWebRtcConnectionData): void;
    sendMessage(msg: string): void;
    open(): void;
    close(): void;
    private internalInit();
    private onReceiveChannelStateChange;
    private tryCallSuccess;
    private log(msg, ...optionalParams);
    private connectionState();
    private dbgId();
}
declare class WebRtcConsumer {
    private _id;
    private _debugMode;
    private _successCalled;
    private connection;
    private channel;
    private _onPassDataToPeer;
    private _onConnectionSucces;
    private _onConnectionError;
    private _onMessageCallback;
    private _config;
    constructor(servers: RTCIceServer[], _id?: string, _debugMode?: boolean);
    setCallbacks(onPassDataToPeer: IWebRtcConnectionDataCallback, onConnectionSucces: () => void, onConnectionError: (error: Object) => void, onMessageCallback: (text: string) => void): void;
    isConnected(): boolean;
    configure(data: IWebRtcConnectionData): void;
    open(): void;
    close(): void;
    private internalInit();
    private onReceiveMessage;
    private onReceiveChannelStateChange;
    private tryCallSuccess;
    private log(msg, ...optionalParams);
    private connectionState();
    private dbgId();
}
declare class WebRtcCommunicator {
    private DEFAULT_TIMEOUT;
    private _id;
    private _debugMode;
    private _configureTimeout;
    private _timer;
    private _producer;
    private _consumer;
    private _passConnectionData2Peer;
    private _onMessageCallback;
    private _onConnectionSuccesCallback;
    private _onConnectionErrorCallBack;
    constructor(servers: RTCIceServer[], configureTimeout?: number, _id?: string, _debugMode?: boolean);
    setCallbacks(passConnectionData2Peer: FWebRtcCommunicatorDataCallback, onConnectionSuccesCallback: () => void, onConnectionErrorCallback: (error: Object) => void, onMessageCallback: (text: string) => void): void;
    open(): void;
    close(): void;
    isConnected(): boolean;
    configure(data: IWebRtcCommunicatorData): void;
    sendMessage(msg: string): void;
    private _onConnectionError;
    private _onConnectionSucces;
    private log(msg, ...optionalParams);
}
