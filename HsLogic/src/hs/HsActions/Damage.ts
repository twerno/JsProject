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


    export enum DAMAGE_TYPE {
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

    //    constructor(source: jsLogic.IAction<HsgameCtx>) {
    //        super(source);
    //    }
    //}

	/**
	 *  positive numbers - healing
	 *  negative - damage
	 */
    export interface DamageParam extends HsActionParam {
        damageType: DAMAGE_TYPE,
        sourceType: SOURCE_TYPE,
        target: HsEntity,
        amount: number,
        cancelDamage: boolean
    }


    /**
     *  QUEUE_TRIGGER_FIRST   - Auchenai Soulpriest
     *  DEFAULT_TRIGGER_LEVEL - Spell Damage/Fallen Heros
     *  QUEUE_TRIGGER_LAST    - Prophet Velens 
     */
    export class OnDamageCalculationEvent<P extends DamageParam> extends HsActionEvent<P> {
        static get type(): string { return OnDamageCalculationEvent.name }
    }

    export class OnDamageDealt<P extends DamageParam> extends HsActionEvent<P> {
        static get type(): string { return OnDamageDealt.name }
    }


    /**
     * Damage
     *
 	 */
    export class Damage<P extends DamageParam> extends jsLogic.CancelableAction<HsGameCtx, P> {

        cancelAction(eventParam: P): boolean {
            return eventParam.cancelDamage
            //|| eventParam.amount === 0
            //|| !eventParam.target.targetInRightZone();
        }
        cancelOnAfterEvent(eventParam: P): boolean { return false }

        onBeforeEventBuilder(param: P): HsActionEvent<P> { return new OnDamageCalculationEvent(param) }
        onAfterEventBuilder(param: P): HsActionEvent<P> { return new OnDamageDealt(param) }


        resolve(_this_: Damage<P>, gameCtx: HsGameCtx): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(

                (resolve, reject): void => {
                    let param: P = _this_.param,
                        targetCounters: jsLogic.CounterMap = param.target.counters;

                    if (targetCounters[DivineShieldCounter.type]) {
                        delete targetCounters[DivineShieldCounter.type];
                        param.amount = 0;
                    }

                    //if (param.target instanceof Player) {
                    //    param.target.hp -= param.amount;
                    //} else if (param.target instanceof Minion) {
                    //    param.target.hp -= param.amount;
                    //}

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