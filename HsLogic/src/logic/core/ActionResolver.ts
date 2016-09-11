import * as Collection from '../../helper/Collection';
import { IActionResolver, IActionResolverFailure, IActionResolverSuccess } from './ActionStackRunner';
import { Action, ActionType, AsyncAction } from './IAction';
import { IActionParam } from './IActionParam';
import { ActionIterceptionData, SuspendAction } from './TechActions';

 
export class ActionResolver extends IActionResolver<ActionType> {

    private interceptData: ActionIterceptionData[] = [];

    resolvable(action: ActionType): boolean {
        if (action.cancelContext)
            for (let i = 0; i < action.cancelContext.length; i++)
                if (action.cancelContext[i].canceled)
                    return false;

        return action.resolvable();
    }

    resolve(action: ActionType, success: IActionResolverSuccess<ActionType>, failure: IActionResolverFailure): void {

        if (action instanceof SuspendAction)
            this.interceptData.push(action.data);
        else if (action instanceof EndSuspendAction)
            Collection.removeFrom(this.interceptData, action.data);


        if (action instanceof AsyncAction)
            this._resolveAsyncAction(action, success, failure);
        else if (action instanceof Action)
            this._resolveSyncAction(action, success, failure);
    }

    private _resolveAsyncAction(action: AsyncAction<IActionParam>,
        success: IActionResolverSuccess<ActionType>,
        failure: IActionResolverFailure): void {

        let self: this = this;

        try {
            action.resolve(
                (consequences: ActionType[]): void => {
                    let result: ActionType[] = self.manipulate(action, consequences);
                    success(result);
                },
                (error: Error): void => { failure(error); }
            )
        } catch (error) {
            failure(error);
        }
    }

    private _resolveSyncAction(action: Action<IActionParam>,
        success: IActionResolverSuccess<ActionType>,
        failure: IActionResolverFailure): void {
        try {
            let result: ActionType[] = this.manipulate(action, action.resolve());
            success(result);
        } catch (error) {
            failure(error);
        }
    }

    private setParent(action: ActionType, consequences: ActionType[]): void {
        for (let i = 0; i < consequences.length; i++)
            consequences[i].parent = action;
    }

    private manipulate(action: ActionType, consequences: ActionType[]): ActionType[] {
        let result: ActionType[] = [];

        for (let i = 0; i < consequences.length; i++) {
            let consequence: ActionType | null = consequences[i];

            for (let j = 0; j < this.interceptData.length; j++) {
                let data: ActionIterceptionData = this.interceptData[j];

                for (let k = 0; k < data.actionsToIntercept.length; k++) {
                    if (consequence instanceof data.actionsToIntercept[k]) {
                        data.interceptedActions.push(consequence);
                        consequence = null;
                        break;
                    }
                }
                if (consequence === null)
                    break;
            }
            if (consequence!== null)
                result.push(consequence);
        }

        if (action instanceof SuspendAction)
            result.push(new EndSuspendAction(action.param, action.data));

        this.setParent(action, result);
        return result;
    }

}

class EndSuspendAction extends Action<IActionParam> {

    resolve(): ActionType[] {
        return this.data.interceptedActions || [];
    }

    constructor(param: IActionParam, public data: ActionIterceptionData) {
        super(param);
    }
} 