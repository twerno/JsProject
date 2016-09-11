import { ActionStackRunner } from './ActionStackRunner';
import { IActionParam } from './IActionParam';
import { Action, ActionTypeClass, ActionType } from './IAction';



export abstract class SuspendAction extends Action<IActionParam> {

    constructor(param: IActionParam, public data: ActionIterceptionData) {
        super(param);
    }
}

export abstract class TechAction extends Action<IActionParam> {

    actionStackRunner: ActionStackRunner;
}


export interface ActionIterceptionData {
    actionsToIntercept: ActionTypeClass[],
    interceptedActions: ActionType[]
}