import { SingleTargetDamageParam } from '../logic/actions/Damage';
import { IActionParam } from '../logic/core/IActionParam';
import { CalculateReceivedDamage } from '../logic/events/DamageEvents';
import { ActionEventClass } from '../logic/core/ActionEvent';
import { HsContext } from './HsContext';


export class EventBuilder {

    protected isEventSuspended(eventAction: ActionEventClass, param: IActionParam): boolean {
        return param.suspendEvents !== undefined
            && param.suspendEvents.indexOf(eventAction.name) !== -1;
    }

    PreDamageEvent(param: SingleTargetDamageParam): CalculateReceivedDamage | null {
        if (this.isEventSuspended(CalculateReceivedDamage, param))
            return null;

        return new CalculateReceivedDamage(param);
    }


    constructor(protected hsCtx: HsContext) { }

}
