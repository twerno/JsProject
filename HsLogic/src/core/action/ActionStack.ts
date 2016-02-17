"use strict";

namespace jsLogic {

    export type OnActionResolving<T> = (action: IAction<T>) => void;
    export type OnActionResolved<T> = (action: IAction<T>, isStackEmpty: boolean) => void;
    export type OnActionRejected<T> = (action: IAction<T>, error: Error) => void;
    

    /**
     *  ActionStack<T>
     * 
     */
    export class ActionStack<T> {


        private _stackFILO: IAction<T>[] = []; // first in - last out
        private _resolvingAction: IAction<T> = null;
        private _timeoutHandler: number = null;


        constructor(
            private _onActionResolving: OnActionResolving<T>,
            private _onActionResolved: OnActionResolved<T>,
            private _onActionRejected: OnActionRejected<T>) {
        }


        putOnTop(action: IAction<T>): void {
            if (action instanceof IAction)
                this._stackFILO.push(action);
            else
                throw new Error(`Action has to be an IAction class.`);
        }


        resolveTopAction(actionParam: T): void {
            if (this._resolvingAction)
                throw new Error(`You can not resolve an action while another action ${this._resolvingAction} is beeing resolved.`);

            if (this.isEmpty())
                throw new Error('There is no action left to resolve!');

            this._resolveAction(this._stackFILO.pop(), actionParam);
        }



        private _resolveAction(action: IAction<T>, actionParam: T): void {
            this._resolvingAction = action;

            this._onActionResolving && this._onActionResolving(action);
            let self: ActionStack<T> = this;

            if (action.timelimit > UNLIMITED)
                this._timeoutHandler = setTimeout(action.timelimit, () => self._onTimeout());


            action.resolve(actionParam)
                .then((consequences: IAction<T>[]) => {
                    self._onSuccess(consequences)
                })
                .catch((error: Error) => {
                    self._onFail(error)
                });
        }


        clear(): void {
            clearTimeout(this._timeoutHandler);
            this._stackFILO = [];
            this._resolvingAction = null;
            this._onActionResolving = null;
            this._onActionResolved = null;
            this._onActionRejected = null;
        }


        isEmpty(): boolean {
            return this._stackFILO.length === 0;
        }


        isBusy(): boolean {
            return this._resolvingAction !== null;
        }


        private _onSuccess(consequences: IAction<T>[]): void {
            this._clearTimeout();

            if (consequences instanceof Array)
                while (consequences.length > 0)
                    this.putOnTop(consequences.pop());

            let actionTmp: IAction<T> = this._resolvingAction;
            this._resolvingAction = null;

            this._onActionResolved && this._onActionResolved(actionTmp, this.isEmpty());
        }


        private _onFail(error: Error): void {
            this._clearTimeout();
            let action: IAction<T> = this._resolvingAction;
            let onActionRejectedTmp: OnActionRejected<T> = this._onActionRejected;

            this.clear();

            onActionRejectedTmp && onActionRejectedTmp(action, error);
            !onActionRejectedTmp && console.error('Post mortem error log:', error);
        }


        private _onTimeout(): void {
            this._clearTimeout();
            this._onFail(new Error(`[Action: ${this._resolvingAction}] Timeout error: ${this._resolvingAction.timelimit}ms.`));
        }


        private _clearTimeout(): void {
            clearTimeout(this._timeoutHandler);
            this._timeoutHandler = null;
        }
    }
}