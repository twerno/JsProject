enum ActionType {
    WORKER,
    SUB_ACTION,
    REMOTE_WORKER
}

///*
// *  IAction
// */
interface IAction {

    id: string;
    parent: IAction;
    actionType: ActionType;
    isFinished: boolean;

    nextSubAction(): IAction;
    applyResult(result: Object): void;

    params: Object;//IJSONSerializable;
    result: Object;//IJSONSerializable;

    doWork(): void;
}