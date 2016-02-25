///<reference path="../core/HsAction.ts"/>
///<reference path="../core/HsActionEvent.ts"/> 
///<reference path="../../core/action/helperActions/CancelableAction.ts"/>

"use strict";

namespace HSLogic {

	/**
	 *  http://hearthstone.gamepedia.com/Advanced_rulebook#Damage_and_Healing
	 *
	 *  1. Damage calculation
	 *  2. Prevent if damage is 0
	 *  3. If target got a divine shield prevent and remove it
	 *  4. Predamage phase - Bolf Ramshield, Ice Block, Animated Armor
	 *  5. deal damage; if (damage > 0) + event
	 */


    export enum HEALTH_MOD_TYPE {
        COMBAT, DIRECT, PAY_LIFE
    }

    export enum SOURCE_TYPE {
        MINION, SPELL, HERO_POWER, HERO, FATIGUE
    }

    /*
     * MINION     + COMBAT
     * MINION     + DIRECT = battlecry, event base effect 
     * SPELL      + DIRECT
     * HERO_POWER + DIRECT = hunter, mage
     * HERO       + COMBAT = druid hero power, waepon
     * 
     */




    //export class HealthModEvent extends jsLogic.ActionEvent<HsActionParam> {

    //    constructor(sourceAction: jsLogic.IAction<HsActionParam>) {
    //        super(sourceAction);
    //    }
    //}

	/**
	 *  positive numbers - healing
	 *  negative - damage
	 */
    export interface DamageParam extends HsEventParam {
        source: Card,
        type: HEALTH_MOD_TYPE,
        sourceType: SOURCE_TYPE,
        target: LivingTarget,
        amount: number,
        cancelDamage: boolean
    }


    /**
     *  QUEUE_TRIGGER_FIRST   - Auchenai Soulpriest
     *  DEFAULT_TRIGGER_LEVEL - Spell Damage/Fallen Heros
     *  QUEUE_TRIGGER_LAST    - Prophet Velens 
     */
    export class OnDamageCalculationEvent extends HsActionEvent<DamageParam> {

        static get type(): string { return OnDamageCalculationEvent.name }
    }

    export class OnAfterDamageEvent extends HsActionEvent<DamageParam> {

        static get type(): string { return OnAfterDamageEvent.name }
    }


    /**
     * Damage
     *
 	 */
    export class Damage extends jsLogic.CancelableAction<HsActionParam, DamageParam> {


        buildOnBeforeEvent(eventParam: DamageParam): HsActionEvent<DamageParam> {
            return new OnDamageCalculationEvent(eventParam);
        }

        buildOnAfterEvent(eventParam: DamageParam): HsActionEvent<DamageParam> {
            return new OnAfterDamageEvent(eventParam);
        }

        doCancelAction(eventParam: DamageParam): boolean {
            return eventParam.cancelDamage
                //|| eventParam.amount === 0
                || !eventParam.target.targetInRightZone();
        }

        doCancelOnAfterEvent(eventParam: DamageParam): boolean {
            return false;
        }

        resolve(_this_: Heal, param: HsActionParam): PromiseOfActions {
            return new Promise<HsAction[]>(

                (resolve, reject): void => {
                    let targetCounters: jsLogic.CounterMap = _this_.eventParam.target.target.counters;

                    if (targetCounters[DivineShieldCounter.type]) {
                        delete targetCounters[DivineShieldCounter.type];
                        _this_.eventParam.amount = 0;
                    }

                    _this_.eventParam.target.target.counters[HpCounter.type].value -= _this_.eventParam.amount;

                    return null;
                }
            );
        }
    }


    //export class DamageMainAction extends jsLogic.MainAction<HsActionParam, OnDamageCalculationEvent> {

    //    protected damageParam: HealthModParam;


    //    protected mainActionToBeResolvedCheck(param: HsActionParam): boolean {
    //        return super.mainActionToBeResolvedCheck(param)
    //            && this.damageParam.amount !== 0
    //            && this.damageParam.target.targetInRightZone();
    //    }


    //    mainActionResolver(param: HsActionParam): HsAction {

    //        let targetCounters: jsLogic.CounterMap = this.damageParam.target.target.counters;

    //        if (targetCounters[DivineShieldCounter.type]) {
    //            delete targetCounters[DivineShieldCounter.type];
    //            this.damageParam.amount = 0;
    //        }

    //        this.damageParam.target.target.counters[HpCounter.type].value -= this.damageParam.amount;

    //        return null;
    //    }


    //    buildOnAfterEvent(param: HsActionParam): HsActionEvent {
    //        return new OnAfterDamageEvent(this.source, this.damageParam);
    //    }


    //    constructor(/* protected */ onBeforeEvent: OnDamageCalculationEvent) {
    //        super(onBeforeEvent);
    //        this.damageParam = onBeforeEvent.damageParam;
    //    }
    //}
}