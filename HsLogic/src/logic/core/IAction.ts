import { HsContext } from '../../environment/HsContext';
import { getNameOfClass } from '../../helper/ClassHelper';
import { Entity } from '../../model/Entity';
import { IActionParam } from './IActionParam';


export type ActionType = Action<IActionParam> | AsyncAction<IActionParam>;
export type SuccessCallback = (consequences: ActionType[]) => void;
export type FailureCallback = (reason?: Error) => void;

export class CancelContext {
    canceled: boolean = false;
}

// export class SuspendActionContext {
//     suspendActions: AsyncActionClass[];
//     suspendedActions: ActionType[];
// }


export interface ActionTypeClass {
    new (param: IActionParam): ActionType;
}


export abstract class GenAction<P extends IActionParam> extends Entity {

    parent: ActionType | null = null;

    /**
     * Cancelable
     */
    public cancelContext: CancelContext[] = [];

    cancelable(cancelContext: CancelContext): this {
        this.cancelContext.push(cancelContext);
        return this;
    }

    /**
     * Constructor
     */
    constructor(public param: P) {
        super();
    }


    /**
     * Helper methods
     */
    get className(): string { return getNameOfClass(this) }
    toString(): string { return this.className }
}

/**
 *  Action<T>
 * 
 */
export abstract class Action<P extends IActionParam> extends GenAction<P> {

    hsContext: HsContext | null = null;
 
    /**
     * abstract worker
     */
    abstract resolve(): ActionType[];

    resolvable(): boolean { return true }
}


/**
 *  AsyncAction<T>
 * 
 */
export abstract class AsyncAction<P extends IActionParam> extends GenAction<P> {

    /**
     * abstract worker
     */
    abstract resolve(success: SuccessCallback, _failure: FailureCallback): void;

    resolvable(): boolean { return true }
}