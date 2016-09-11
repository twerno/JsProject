import { Action, ActionType, CancelContext } from '../core/IAction';
import { IActionParam } from '../core/IActionParam';
import * as Const from '../../Const';
import * as Event from '../Events';


export interface SingleTargetDamageParam extends IActionParam {
    target: Object,
    amount: number,
    damageType: Const.DAMAGE_TYPE,
    damageState: Const.DAMAGE_OR_HEAL_STATE
}


export class DamagePhase extends Action<SingleTargetDamageParam> {

    resolve(): ActionType[] {

        let cancelCtx: CancelContext = new CancelContext();

        return [

            // Fallen Hero | Spellpower | CustomSpellPowerCalculator >> Prophet Velens 
            new Event.CalculateDamage(this.param),

            // Cursed Blade >> Animated Armor >> Bolf Ramshield | Ice Block
            new Event.CalculateReceivedDamage(this.param)
                .managesCancelCtx(cancelCtx),

            new Damage(this.param)
                .cancelable(cancelCtx),

            new Event.PostDamageEvent(this.param)
                .cancelable(cancelCtx)
        ];
    }

}


export class Damage extends Action<SingleTargetDamageParam> {

    resolve(): ActionType[] {

        // param.damageState = DAMAGE_STATE.DEALT;
        // param.amount = Math.abs(param.amount);

        // if (param.target.tags.contains(Def.Immune_Tag)) {
        //     param.amount = 0;
        //     param.damageState = DAMAGE_STATE.PREVENTED;
        // }

        // if (param.amount > 0 && param.target.tags.contains(Def.Divine_Shield_Tag)) {
        //     param.amount = 0;
        //     param.target.tags.removeAll(Def.Divine_Shield_Tag);
        // }

        // if (param.target.body.hp() > 0 && param.target.body.hp() - param.amount <= 0)
        //     gameCtx.lethalMonitor.registerCandidate(param.target, param.source);

        // if (param.source.entity instanceof Minion && param.damageState !== DAMAGE_STATE.PREVENTED)
        //     (<Minion>param.source.entity).tags.removeAll(Def.Stealth_Tag);

        // let armorDamages: number = Math.min(param.amount, param.target.body.armor);
        // param.target.body.armor -= armorDamages;
        // param.target.body.damages += param.amount - armorDamages;

        return [];
    }
}