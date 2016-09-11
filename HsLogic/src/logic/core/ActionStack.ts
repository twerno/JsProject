import {IActionStack} from './ActionStackRunner';
import {Action, ActionType, AsyncAction} from './IAction';


export class ActionStack implements IActionStack<ActionType> {

    protected actions: ActionType[] = [];

    putOnTop(actions: ActionType | ActionType[]): void {
        if (actions instanceof Array)
            for (let action of actions.reverse())
                this._putOnTop(action);
        else
            this._putOnTop(actions);
    }

    putOnBottom(actions: ActionType | ActionType[]): void {
        if (actions instanceof Array)
            for (let action of actions)
                this._putOnBottom(action);
        else
            this._putOnBottom(actions);
    }

    isEmpty(): boolean {
        return this.actions.length === 0;
    }

    pop(): ActionType | null {
        return this.actions.pop() || null;
    }

    protected _putOnTop(action: ActionType): void {
        if (!action)
            return;
        else if (action instanceof Action
            || action instanceof AsyncAction)
            this.actions.push(action);
        else
            throw new Error(`Action has to be an IAction class.`);
    }

    protected _putOnBottom(action: ActionType): void {
        if (!action)
            return;
        else if (action instanceof Action
            || action instanceof AsyncAction)
            this.actions.unshift(action);
        else
            throw new Error(`Action has to be an IAction class.`);
    }
}