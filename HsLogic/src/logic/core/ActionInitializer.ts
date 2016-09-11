import { HsContext } from '../../environment/HsContext';
import { Action, ActionType } from './IAction';
import { ActionStackRunner, IActionInitializer } from './ActionStackRunner';
import { TechAction } from './TechActions';

export class ActionInitializer extends IActionInitializer {

    stackRunner: ActionStackRunner;

    initialize(action: ActionType): void {

        if (action instanceof Action) {
            action.hsContext = this.hsCtx;
        }

         if (action instanceof TechAction) {
            action.actionStackRunner = this.stackRunner;
         }

    }

    constructor(private hsCtx: HsContext) {
        super();
    }
}