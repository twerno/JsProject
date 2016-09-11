import { SuspendAction } from '../logic/core/TechActions';
import { ActionResolver } from '../logic/core/ActionResolver';
import * as Const from '../Const';
import * as Event from '../logic/Events';
import { DamagePhase, SingleTargetDamageParam } from '../logic/actions/Damage';
import { HsContext } from '../environment/HsContext';
import { ActionInitializer } from '../logic/core/ActionInitializer';
import { ActionType } from '../logic/core/IAction';
import { ActionStackRunner, ActionStackRunnerCallbacks } from '../logic/core/ActionStackRunner';

let stackRunner: ActionStackRunner;

let callbacks: ActionStackRunnerCallbacks<ActionType> = {
    onActionResolving: (_action: ActionType, _resolvable: boolean): void => {
        console.log(`STARTING: ${_action}`);
    },
    onActionResolved: (_action: ActionType): void => {
        console.log(`FINISHED: ${_action}`);
        if (!stackRunner.isEmpty)
            stackRunner.resolveTopAction();
    },
    onActionRejected: (_action: ActionType, _error: Error): void => {
        console.log(`ERROR: ${_error.message}`);
        if (!stackRunner.isEmpty)
            stackRunner.resolveTopAction();
    }
}

let initializer: ActionInitializer = new ActionInitializer(new HsContext());

stackRunner = new ActionStackRunner(callbacks, initializer, new ActionResolver());

class TestAction extends SuspendAction<SingleTargetDamageParam> {
    resolve(): ActionType[] {
        return [new DamagePhase(param)];
    }
}

let param: SingleTargetDamageParam = {
    source: null,
    amount: 1,
    damageState: Const.DAMAGE_OR_HEAL_STATE.UNDEFINED,
    damageType: Const.DAMAGE_TYPE.DIRECT,
    target: new Object()
};

stackRunner.putOnTop(
    new TestAction(param,
        { actionsToIntercept: [Event.PostDamageEvent] }));
stackRunner.resolveTopAction();