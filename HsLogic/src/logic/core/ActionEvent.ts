import {IActionParam} from './IActionParam';
import {HsContext} from '../../environment/HsContext';
import {ActionType, CancelContext, Action} from './IAction';

export interface ActionEventClass {
    new (param: IActionParam, hsCtx: HsContext): ActionEvent<IActionParam>;
}

export type ActionEventType = ActionEvent<IActionParam>;

export abstract class ActionEvent<P extends IActionParam> extends Action<P> {

    get eventName(): string { return this.className; }

    resolve(): ActionType[] {
        let actions: ActionType[] = [];
        //     triggers: Trigger[],
        //     doneByDominantPlayer: Trigger[] = [];

        // // Dominant Player === active player (for sake of simplicity)
        // // Dominant Player Triggers
        // triggers = self._getDominantPlayerTriggers(gameCtx.activePlayer)
        //     .buildSet(param.source, gameCtx);

        // // Dominant Player Queue
        // actions.push(new ProcessQueue({
        //     source: param.source,
        //     event: self.event,
        //     triggers: triggers,
        //     done: doneByDominantPlayer
        // }));


        // // Secondary Player Queue
        // actions.push(new InlineAction((resolve, reject): void => {
        //     let innerActions: ActionType[] = [];
        //     // Double safeguard
        //     // Subtrack triggers that already had been triggered by dominant player
        //     triggers = self._getSecondaryPlayerTriggers(gameCtx.activePlayer, doneByDominantPlayer)
        //         .buildSet(param.source, gameCtx);

        //     // Secondary Player Queue
        //     innerActions.push(new ProcessQueue({
        //         source: param.source,
        //         event: self.event,
        //         triggers: triggers,
        //         done: []
        //     }));
        //     resolve(innerActions);

        // }));
        // resolve(actions);
        return actions;
    }
}

export abstract class PreActionEvent<P extends IActionParam> extends ActionEvent<P> {

    protected _cancelCtxToBeFilled: CancelContext;

    public managesCancelCtx(cancelContext: CancelContext): this {
        this._cancelCtxToBeFilled = cancelContext;
        return this;
    }

    public counterMainAction(): void {
        if (this._cancelCtxToBeFilled) 
            this._cancelCtxToBeFilled.canceled = true;
    }
}
