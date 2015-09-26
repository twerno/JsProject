/////<reference path="Action.ts"/>
/////<reference path="Task.ts"/>
//	
//
//
//interface IStackErrorCallback { (stack: ActionStack, action: IAction, error: Error): void; }
//
//interface IStackActionCallback { (stack: ActionStack, action: IAction): void; }
//
//interface IStackCallback { (stack: ActionStack): void; }
//
//
//
///*
// *  ActionStack
// */
//class ActionStack {
//
//    onError: Collections.List<IStackErrorCallback> = new Collections.List<IStackErrorCallback>();
//
//    onActionSuccess: Collections.List<IStackActionCallback> = new Collections.List<IStackActionCallback>();
//
//    onStackComplete: IStackCallback = null;
//
//    onBeforeAction: Collections.List<IStackActionCallback> = new Collections.List<IStackActionCallback>();
//
//    onPutActionOnStack: IStackActionCallback = null;
//
//    onRemoveActionFromStack: IStackActionCallback = null;
//
//
//    private isCompleted: boolean = false;
//    _stackFILO: Array<IAction> = [];
//
//
//
//    /*
//     *  putOnStack
//     */
//    putOnTop(action: IAction): void {
//        this.isCompleted = false;
//        this._stackFILO.push(action);
//        this.onPutActionOnStack === null || this.onPutActionOnStack(this, action);
//    }
//
//
//
//    /*
//     *  putAtBottom
//     */
//    putAtBottom(action: IAction): void {
//        this.isCompleted = false;
//        this._stackFILO.unshift(action);
//        this.onPutActionOnStack === null || this.onPutActionOnStack(this, action);
//    }
//
//
//
//    run(): void {
//        if (this._stackFILO.length != 0) {
//            var action: IAction = this._stackFILO[this._stackFILO.length - 1];
//
//            if (action.isFinished())
//                this.removeFromStack(); // log & remove & rerun 
//            else {
//                if (action.executionMode() === ActionType.SUB_ACTION) {
//                    this.runSubAction(action);
//                } else if (action.executionMode() === ActionType.WORKER)
//                    this.runWorker(action);
//            }
//        } else {
//            this.onStackComplete != null && !this.isCompleted && this.onStackComplete(this);
//            this.isCompleted = true;
//        }
//    }
//
//
//
//    private runSubAction(action: IAction): void {
//        var action: IAction = action.nextSubAction();
//        if (action != null) {
//            this.putOnTop(action);
//            this.run();
//        }
//        else {
//            throw new Error('[' + action + '] extSubAction returned null');
//        }
//    }
//
//
//
//    private runWorker(action: IAction): void {
//        try {
//
//            if (this.onBeforeAction != null)
//                for (var i = 0; i < this.onBeforeAction.length(); i++)
//                    this.onBeforeAction.get(i)(this, action);
//
//            new TaskRunner(action, this._onSuccess, this._onError, this._onTimeout, 3 * 1000)
//                .runAsync();
//
//        } catch (error) {
//            this.callErrorCalbacks(action, error);
//        }
//    }
//
//
//
//    private removeFromStack(): void {
//        var action: IAction = this._stackFILO.pop();
//        this.onRemoveActionFromStack === null || this.onRemoveActionFromStack(this, action);
//        this.run();
//    }
//
//
//    private _onSuccess: ITaskHandler = function(task: IAction, result: Object): void {
//        if (this.onActionSuccess != null)
//            for (var i = 0; i < this.onActionSuccess.length(); i++)
//                this.onActionSuccess.get(i)(this, task);
//
//        this.run();
//    }.bind(this);
//
//
//    private _onError: ITaskErrorHandler = function(action: IAction, error: Error): void {
//        this.callErrorCalbacks(action, error);
//    }.bind(this);
//
//
//    private _onTimeout: ITaskHandler = function(task: IAction): void {
//        this._onError(task, new Error('timeout'));
//    }.bind(this);
//
//
//    private callErrorCalbacks(action: IAction, error: Error): void {
//        if (this.onError != null)
//            for (var i = 0; i < this.onError.length(); i++)
//                this.onError.get(i)(this, action, error);
//    }
//}