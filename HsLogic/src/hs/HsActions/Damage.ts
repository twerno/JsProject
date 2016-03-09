///<reference path="../core/HsAction.ts"/>
///<reference path="../../core/action/abstractActions/CancelableAction.ts"/>

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




    //export class HealthModEvent extends jsLogic.ActionEvent<HsgameCtx> {

    //    constructor(sourceAction: jsLogic.IAction<HsgameCtx>) {
    //        super(sourceAction);
    //    }
    //}

	/**
	 *  positive numbers - healing
	 *  negative - damage
	 */
    export interface DamageParam extends HsActionParam {
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

    export class OnDamageDealt extends HsActionEvent<DamageParam> {
        static get type(): string { return OnDamageDealt.name }
    }


    /**
     * Damage
     *
 	 */
    export class Damage extends jsLogic.CancelableAction<HsGameCtx, DamageParam> {

        cancelAction(eventParam: DamageParam): boolean {
            return eventParam.cancelDamage
                //|| eventParam.amount === 0
                || !eventParam.target.targetInRightZone();
        }
        cancelOnAfterEvent(eventParam: DamageParam): boolean { return false }

        onBeforeEventBuilder(param: DamageParam): HsActionEvent<DamageParam> { return new OnDamageCalculationEvent(param) }
        onAfterEventBuilder(param: DamageParam): HsActionEvent<DamageParam> { return new OnDamageDealt(param) }


        resolve(_this_: Heal, gameCtx: HsGameCtx): PromiseOfActions {
            return new Promise<HsAction<P>[]>(

                (resolve, reject): void => {
                    let targetCounters: jsLogic.CounterMap = _this_.param.target.target.counters;

                    if (targetCounters[DivineShieldCounter.type]) {
                        delete targetCounters[DivineShieldCounter.type];
                        _this_.param.amount = 0;
                    }

                    _this_.param.target.target.hp -= _this_.param.amount;

                    resolve([]);
                }
            );
        }
    }


    //export class DamageMainAction extends jsLogic.MainAction<HsgameCtx, OnDamageCalculationEvent> {

    //    protected damageParam: HealthModParam;


    //    protected mainActionToBeResolvedCheck(param: HsgameCtx): boolean {
    //        return super.mainActionToBeResolvedCheck(param)
    //            && this.damageParam.amount !== 0
    //            && this.damageParam.target.targetInRightZone();
    //    }


    //    mainActionResolver(param: HsgameCtx): HsAction {

    //        let targetCounters: jsLogic.CounterMap = this.damageParam.target.target.counters;

    //        if (targetCounters[DivineShieldCounter.type]) {
    //            delete targetCounters[DivineShieldCounter.type];
    //            this.damageParam.amount = 0;
    //        }

    //        this.damageParam.target.target.counters[HpCounter.type].value -= this.damageParam.amount;

    //        return null;
    //    }


    //    buildOnAfterEvent(param: HsgameCtx): HsActionEvent {
    //        return new OnAfterDamageEvent(this.source, this.damageParam);
    //    }


    //    constructor(/* protected */ onBeforeEvent: OnDamageCalculationEvent) {
    //        super(onBeforeEvent);
    //        this.damageParam = onBeforeEvent.damageParam;
    //    }
    //}
}