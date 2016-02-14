"use strict";

namespace jsLogic {

    export type PromiseOfActions<T> = Promise<IAction<T>[]>;
    export type OnActionResolving<T> = (action: IAction<T>) => void;
    export type OnActionResolved<T> = (action: IAction<T>, isStackEmpty: boolean) => void;
    export type OnActionRejected<T> = (action: IAction<T>, error: Error) => void;

    export const NO_CONSEQUENCES: any = null;



    /**
     *  IAction<T>
     * 
     */
    export abstract class IAction<T> {

        doResolve: boolean = true;


        toString(): string {
            return Utils.getNameOfClass(this);
        }


        abstract resolve(param: T): PromiseOfActions<T>;

    }
    
    
    
    /**
     *  BaseAction<T>
     * 
     */
    export abstract class BaseAction<T> extends IAction<T> {

        resolve(param: T): PromiseOfActions<T> {
            return new Promise<IAction<T>[]>(

                (resolve, reject): void => {
                    this.baseActionResolver(param);

                    resolve(NO_CONSEQUENCES);
                });
        }

        protected abstract baseActionResolver(param: T): void;

    }



    /**
     *  ActionStack<T>
     * 
     */
    export class ActionStack<T> {

        private _FILO: IAction<T>[] = [];
        private _resolvingAction: IAction<T> = null;


        constructor(
            public onActionResolving: OnActionResolving<T>,
            public onActionResolved: OnActionResolved<T>,
            public onActionRejected: OnActionRejected<T>) {
        }


        putOnTop(action: IAction<T>): void {
            if (action instanceof IAction)
                this._FILO.push(action);
            else
                throw new Error(`Action has to be an IAction class.`);
        }


        resolveTopAction(actionParam: T): void {
            if (this._resolvingAction)
                throw new Error(`You can not resolve an action while another action ${this._resolvingAction} is beeing resolved.`);

            if (this.isEmpty())
                throw new Error('There is no action left to resolve!');

            this._resolveAction(this._FILO.pop(), actionParam);
        }


        clear(): void {
            this._FILO = [];
            this._resolvingAction = null;
            this.onActionResolving = null;
            this.onActionResolved = null;
            this.onActionRejected = null;
        }


        isEmpty(): boolean {
            return this._FILO.length === 0;
        }


        private _resolveAction(action: IAction<T>, actionParam: T): void {
            this._resolvingAction = action;

            this.onActionResolving && this.onActionResolving(action);

            if (action.doResolve)
                action.resolve(actionParam)
                    .then(this._onSucceed)
                    .catch(this._onFailed);
            else /* action NOT resolved */
                this._onSucceed(NO_CONSEQUENCES);
        }


        private _onSucceed = (consequences: IAction<T>[]): void => {
            if (consequences instanceof Array)
                while (consequences.length > 0)
                    this.putOnTop(consequences.shift());

            let actionTmp: IAction<T> = this._resolvingAction;
            this._resolvingAction = null;

            this.onActionResolved && this.onActionResolved(actionTmp, this.isEmpty());
        }


        private _onFailed = (error: Error): void => {
            let action: IAction<T> = this._resolvingAction;
            let onActionRejectedTmp: OnActionRejected<T> = this.onActionRejected;

            this.clear();

            onActionRejectedTmp && onActionRejectedTmp(action, error);
        }
    }
}