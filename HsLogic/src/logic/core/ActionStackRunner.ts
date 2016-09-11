import { ActionStack } from './ActionStack';
import { ActionInitializer } from './ActionInitializer';
import { ActionResolver } from './ActionResolver';
import { ActionType } from './IAction';


export type OnActionResolving<T> = (action: T, resolvable: boolean) => void;
export type OnActionResolved<T> = (action: T) => void;
export type OnActionRejected<T> = (action: T, error: Error) => void;


export interface IActionStack<T> {
    putOnTop(actions: T | T[]): void;
    putOnBottom(actions: T | T[]): void;
    isEmpty(): boolean;
    pop(): T | null;
}

export interface ActionStackRunnerCallbacks<T> {
    onActionResolving: OnActionResolving<T>,
    onActionResolved: OnActionResolved<T>,
    onActionRejected: OnActionRejected<T>
}

export abstract class IActionInitializer {
    abstract initialize(action: ActionType): void;
}

export type IActionResolverSuccess<T> = (consequences: T[]) => void;
export type IActionResolverFailure = (error: Error) => void


export abstract class IActionResolver<T> {
    abstract resolvable(action: T): boolean;

    abstract resolve(action: T, success: IActionResolverSuccess<T>, failure: IActionResolverFailure): void;
}


export class ActionStackRunner {

    private _actionInProgress: ActionType | null = null;
    public stack: IActionStack<ActionType> = new ActionStack();
    protected resolver: IActionResolver<ActionType> = new ActionResolver();

    constructor(protected _callbacks: ActionStackRunnerCallbacks<ActionType>, protected actionInitializer: ActionInitializer) {
    }

    putOnTop(action: ActionType): void {
        this.actionInitializer
            && this.actionInitializer.initialize(action);

        this.stack.putOnTop(action);
    }

    isEmpty(): boolean {
        return this.stack.isEmpty();
    }

    resolveTopAction(): void {
        if (this._actionInProgress)
            throw new Error(`You can not resolve an action while another action ${this._actionInProgress} is beeing resolved.`);

        this._actionInProgress = this.stack.pop();
        if (this._actionInProgress !== null)
            this._resolveAction(this._actionInProgress);
        else
            throw new Error('There is no action left to resolve!');
    }

    private _resolveAction(action: ActionType): void {
        let resolvable: boolean = this.resolver.resolvable(action),
            self: this = this;

        this._callbacks
            && this._callbacks.onActionResolving
            && this._callbacks.onActionResolving.call(undefined, action, resolvable);

        if (resolvable) {
            this.resolver.resolve(action,
                (consequences: ActionType[]): void => { self._onSuccess(action, consequences) },
                (error: Error): void => { self._onFail(action, error) }
            );
        }
        else
            this._onSuccess(action, []);
    }

    private _onSuccess(action: ActionType, consequences: ActionType[]): void {
        this._actionInProgress = null;

        this._addConsequnces(consequences);
        this._callbacks
            && this._callbacks.onActionResolved
            && this._callbacks.onActionResolved.call(undefined, action);
    }

    private _onFail(action: ActionType, error: Error): void {
        this._actionInProgress = null;

        this._callbacks
            && this._callbacks.onActionRejected
            && this._callbacks.onActionRejected.call(undefined, action, error);
    }

    private _addConsequnces(consequences: ActionType | ActionType[]): void {
        let action: ActionType | null;

        if (consequences instanceof Array) {
            while (consequences.length > 0) {
                action = consequences.pop() || null;
                if (action !== null)
                    this.putOnTop(action);
            }
        }
        else
            this.putOnTop(consequences);
    }
}
