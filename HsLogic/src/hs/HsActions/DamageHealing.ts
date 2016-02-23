/////<reference path="../HsAction.ts"/>
/////<reference path="../HsActionEvent.ts"/> 
/////<reference path="../../core/action/eventAction/CancellableAction.ts"/>
//
//"use strict";
//
//namespace HSLogic {
//
//
//	
//
//
//	/**
//	 *  http://hearthstone.gamepedia.com/Advanced_rulebook#Damage_and_Healing
//	 *
//	 *  1. Damage calculation
//	 *  2. Prevent if damage is 0
//	 *  3. If target got a divine shield prevent and remove it
//	 *  4. Predamage phase - Bolf Ramshield, Ice Block, Animated Armor
//	 *  5. deal damage; if (damage > 0) + event
//	 */
//
//
//    export enum HEALTH_MOD_TYPE {
//        COMBAT, DIRECT, PAY_LIFE
//    }
//
//    export enum SOURCE_TYPE {
//        MINION, SPELL, HERO_POWER, HERO
//    }
//    
//    /*
//     * MINION     + COMBAT
//     * MINION     + DIRECT = battlecry, event base effect 
//     * SPELL      + DIRECT
//     * HERO_POWER + DIRECT = hunter, mage
//     * HERO       + COMBAT = druid hero power, waepon
//     * 
//     */
//
//
//
//
//    export class HealthModEvent extends jsLogic.ActionEvent<HsActionParam> {
//
//        constructor(sourceAction: jsLogic.IAction<HsActionParam>) {
//            super(sourceAction);
//        }
//    }
//
//	/**
//	 *  positive numbers - healing
//	 *  negative - damage
//	 */
//    export interface HealthModParam {
//        sourceAction: jsLogic.IAction<HsActionParam>,
//        source: Card,
//        type: HEALTH_MOD_TYPE,
//        sourceType: SOURCE_TYPE,
//        target: LivingTarget,
//        amount: number
//    }
//
//
//    /**
//     *  QUEUE_TRIGGER_FIRST   - Auchenai Soulpriest
//     *  DEFAULT_TRIGGER_LEVEL - Spell Damage/Fallen Heros
//     *  QUEUE_TRIGGER_LAST    - Prophet Velens 
//     */
//    export class DamageHealingCalculationEvent extends jsLogic.OnBeforeMainActionEvent<HsActionParam> {
//
//        static get type(): string { return DamageHealingCalculationEvent.name }
//
//        constructor(public damageParam: HealthModParam) {
//            super(damageParam.sourceAction);
//        }
//    }
//
//    export class OnAfterDamageEvent extends HsActionEvent {
//
//        static get type(): string { return OnAfterDamageEvent.name }
//
//        constructor(source: jsLogic.IAction<HsActionParam>, public damageParam: HealthModParam) {
//            super(source);
//        }
//    }
//	
//	
//    /**
//     * Damage
//     *
//       */
//    export class DamageHealing extends jsLogic.CancellableAction<HsActionParam, DamageHealingCalculationEvent> {
//
//
//        getMainAction(param: HsActionParam, onBeforeEvent: DamageHealingCalculationEvent): DamageHealingMainAction {
//            return new DamageHealingMainAction(onBeforeEvent);
//        }
//
//        getOnBeforeMainActionResolveEvent(param: HsActionParam): DamageHealingCalculationEvent {
//            return new DamageHealingCalculationEvent(this.damageParam);
//        }
//
//        constructor(protected damageParam: HealthModParam) {
//            super(damageParam.sourceAction);
//        }
//    }
//
//
//    export class DamageHealingMainAction extends jsLogic.MainAction<HsActionParam, DamageHealingCalculationEvent> {
//
//        protected damageParam: HealthModParam;
//
//
//        protected doResolveMainAction(param: HsActionParam): boolean {
//            return super.doResolveMainAction(param)
//                && this.damageParam.amount !== 0
//                && this.damageParam.target.targetInRightZone();
//        }
//
//
//        mainActionResolver(param: HsActionParam): HsAction {
//
//            let targetCounters: jsLogic.CounterMap = this.damageParam.target.target.counters;
//
//            if (targetCounters[DivineShieldCounter.type]) {
//                delete targetCounters[DivineShieldCounter.type];
//                this.damageParam.amount = 0;
//            }
//
//            this.damageParam.target.target.counters[HpCounter.type].value -= this.damageParam.amount;
//
//            return null;
//        }
//
//
//        onAfterMainActionEvent(param: HsActionParam): HsActionEvent {
//            return new OnAfterDamageEvent(this.source, this.damageParam);
//        }
//
//
//        constructor(/* protected */ onBeforeEvent: DamageHealingCalculationEvent) {
//            super(onBeforeEvent);
//            this.damageParam = onBeforeEvent.damageParam;
//        }
//    }
//}