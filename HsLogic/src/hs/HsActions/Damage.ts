///<reference path="../HsAction.ts"/>
///<reference path="../HsActionEvent.ts"/> 
///<reference path="../../core/action/eventAction/CancellableAction.ts"/>

"use strict";

namespace HSLogic {


    export interface DamageParam {
        source: jsLogic.IAction<HsActionParam>,
        target: LivingTarget,
        amount: number
    }

    export class OnBeforeDamageEvent extends jsLogic.OnBeforeMainActionEvent<HsActionParam> {

        static get type(): string { return (new OnBeforeDamageEvent({ target: null, source: null, amount: null })).type; }

        constructor(public damageParam: DamageParam) {
            super(damageParam.source);
        }
    }

    export class OnAfterDamageEvent extends HsActionEvent {

        static get type(): string { return (new OnAfterDamageEvent(null, null)).type; }

        constructor(source: DamageMainAction, public damageParam: DamageParam) {
            super(source);
        }
    }
	
	
    /**
     * Damage
     *
 	 */
    export class DamageWrapper extends jsLogic.CancellableAction<HsActionParam, OnBeforeDamageEvent> {


        getMainAction(param: HsActionParam, onBeforeEvent: OnBeforeDamageEvent): DamageMainAction {
            return new DamageMainAction(onBeforeEvent);
        }

        getOnBeforeMainActionResolveEvent(param: HsActionParam): OnBeforeDamageEvent {
            return new OnBeforeDamageEvent(this.damageParam);
        }

        constructor(protected damageParam: DamageParam) {
            super(damageParam.source);
        }
    }


    export class DamageMainAction extends jsLogic.MainAction<HsActionParam, OnBeforeDamageEvent> {

        protected damageParam: DamageParam;


        protected doResolveMainAction(param: HsActionParam): boolean {
            return super.doResolveMainAction(param)
                && this.damageParam.amount !== 0
                && this.damageParam.target.targetInRightZone();
        }


        mainActionResolver(param: HsActionParam): HsAction {

            let targetCounters: jsLogic.CounterMap = this.damageParam.target.target.counters;

            if (targetCounters[DivineShieldCounter.type]) {
                delete targetCounters[DivineShieldCounter.type];
                this.damageParam.amount = 0;
            }

            this.damageParam.target.target.counters[HpCounter.type].value -= this.damageParam.amount;

            return null;
        }


        onAfterMainActionEvent(param: HsActionParam): HsActionEvent {
            return new OnAfterDamageEvent(this, this.damageParam);
        }


        constructor(/* protected */ onBeforeEvent: OnBeforeDamageEvent) {
            super(onBeforeEvent);
            this.damageParam = onBeforeEvent.damageParam;
        }
    }
}