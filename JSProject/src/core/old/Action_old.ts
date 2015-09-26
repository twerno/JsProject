/////<reference path="Task.ts"/>
/////<reference path="../JSONHelper.ts"/>


//class ActionHelper {

//    static getChain(action: IAction): Array<IAction> {
//        if (action.parent === null)
//            return [action];
//        else {
//            var result: Array<IAction> = ActionHelper.getChain(action.parent);
//            result.push(action);
//            return result;
//        }
//    }

//}


//enum ActionType {
//    WORKER,
//    SUB_ACTION,
//    REMOTE_WORKER
//}


///*
// *  IAction
// */
//interface IAction extends ITask {

//    nextSubAction(): IAction;

//    actionType: ActionType;

//    isFinished: boolean;

//    parent: IAction;

//    applyResult(result: ITaskResult): void;

//    id: string;

//    parameters: IJSONSerializable;

//    results: IJSONSerializable;
//}





//class Action /*implements IAction*/ {

//    private _isFinished: boolean = false;

//    private _parent: IAction = null;

//    private _worker: ITaskAsyncWorker = null;

//    private _id: string;



//    constructor(id: string, parent: IAction, worker: ITaskAsyncWorker) {
//        this._parent = parent;
//        this._worker = worker;
//        this._id = id;
//    }


//    applyResult(result: ITaskResult): void {
//        this._isFinished = true;
//    }

//    nextSubAction(): IAction { return null }

//    get actionType(): ActionType { return ActionType.WORKER }

//    get isFinished(): boolean { return this._isFinished }

//    get parent(): IAction { return this._parent }

//    get asyncWorker(): ITaskAsyncWorker { return this._worker }

//    toString(): string { return this.constructor['name'] }

//    get id(): string { return this._id }

//    parameters: IJSONSerializable = null;

//    results: IJSONSerializable;
//}




///*
// *  ActionList
// */
//class ActionList extends Action {

//    list: Array<IAction> = [];

//    constructor(id: string, parent: IAction) {
//        super(id, parent, null);
//    }
	
	
//	/**
//	 *  Return actions in natural order
//	 */
//    nextSubAction(): IAction {
//        return this.list.shift() || null;
//    }


//    push(action: IAction): void {
//        if (action != null)
//            this.list.push(action);
//    }


//    pushMany(actions: Array<IAction>): void {
//        if (actions != null)
//            for (var i = 0; i < actions.length; i++) {
//                if (actions[i] != null)
//                    this.list.push(actions[i]);
//            }
//    }

//    get actionType(): ActionType { return ActionType.SUB_ACTION }

//    get isFinished(): boolean { return this.list.length === 0 }
//}