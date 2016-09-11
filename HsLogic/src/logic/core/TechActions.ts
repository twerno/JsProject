import { ActionStackRunner } from './ActionStackRunner';
import { IActionParam } from './IActionParam';
import { Action, ActionTypeClass, ActionType } from './IAction';



export abstract class SuspendAction<T extends IActionParam> extends Action<T> {

    constructor(param: T, public data: ActionIterceptionData) {
        super(param);
        data.interceptedActions = []
    }
}

export abstract class TechAction extends Action<IActionParam> {

    actionStackRunner: ActionStackRunner;
}


export interface ActionIterceptionData {
    actionsToIntercept: ActionTypeClass[],
    interceptedActions?: ActionType[]
}