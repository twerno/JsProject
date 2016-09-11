import {Action, ActionType, CancelContext} from '../core/IAction';
import {IActionParam} from '../core/IActionParam';
import * as Const from '../../Const';
import * as Event from '../Events';


export interface HealParam extends IActionParam {
    target: Object,
    amount: number,
    state: Const.DAMAGE_OR_HEAL_STATE
}


export class HealPhase extends Action<HealParam> {

    resolve(): ActionType[] {

        let cancelCtx: CancelContext = new CancelContext();
        
        return [

            // Prophet Velens 
            new Event.CalculateHeal(this.param),

            // Auchenai Soulpriest | Embrace the Shadow
            new Event.PreHealEvent(this.param)
                .managesCancelCtx(cancelCtx),

            new Heal(this.param)
                .cancelable(cancelCtx),

            new Event.PostHealEvent(this.param)
                .cancelable(cancelCtx)
        ];
    }

}


export class Heal extends Action<HealParam> {

    resolve(): ActionType[] {

        return [];
    }
}