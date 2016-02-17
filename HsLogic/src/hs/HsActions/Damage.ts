///<reference path="../HsAction.ts"/>
///<reference path="../../core/action/eventAction/CancellableAction.ts"/>

"use strict";

namespace HSLogic {


    export interface DamageParam {
        source: jsLogic.IAction<HsActionParam>,
        target: jsLogic.Entity,
        amount: number
    }

    export class OnBeforeDamageEvent extends jsLogic.OnBeforeMainActionEvent<HsActionParam> {
        constructor(public damageParam: DamageParam) {
            super(damageParam.source);
        }
    }

    export class OnAfterDamageEvent extends HsActionEvent {
        constructor(source: DamageMainAction, public damageParam: DamageParam) {
            super(source);
        }
    }
	
	
    /**
     * Damage
     *
 	 */
    export class Damage extends jsLogic.CancellableAction<HsActionParam, OnBeforeDamageEvent> {


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
                && this.damageParam.amount !== 0;
            // && target in play
        }


        mainActionResolver(param: HsActionParam): HsAction {

            let targetCounters: jsLogic.CounterMap = this.damageParam.target.counters;

            if (targetCounters[DivineShieldCounter.type]) {
                delete targetCounters[DivineShieldCounter.type];
                this.damageParam.amount = 0;
            }

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