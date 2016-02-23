///<reference path="../HsAction.ts"/>
///<reference path="../HsActionEvent.ts"/> 
///<reference path="../../core/action/eventAction/CancellableAction.ts"/>

"use strict";

namespace HSLogic {


    export class HealCalculationEvent extends jsLogic.OnBeforeMainActionEvent<HsActionParam> {

        static get type(): string { return HealCalculationEvent.name }

        constructor(public healParam: HealthModParam) {
            super(healParam.sourceAction);
        }
    }



    export class OnAfterHealEvent extends HsActionEvent {

        static get type(): string { return OnAfterHealEvent.name }

        constructor(source: jsLogic.IAction<HsActionParam>, public healParam: HealthModParam) {
            super(source);
        }
    }
    
    


    /**
     * Heal
     *
     */
    export class Heal extends jsLogic.CancellableAction<HsActionParam, HealCalculationEvent> {


        buildMainAction(param: HsActionParam, onBeforeEvent: HealCalculationEvent): HealMainAction {
            return new HealMainAction(onBeforeEvent);
        }

        buildOnBeforeEvent(param: HsActionParam): HealCalculationEvent {
            return new HealCalculationEvent(this.healParam);
        }

        constructor(protected healParam: HealthModParam) {
            super(healParam.sourceAction);
        }
    }


    export class HealMainAction extends jsLogic.MainAction<HsActionParam, HealCalculationEvent> {

        protected healParam: HealthModParam;



        protected mainActionToBeResolvedCheck(param: HsActionParam): boolean {
            return super.mainActionToBeResolvedCheck(param)
                && this.healParam.amount !== 0
                && this.healParam.target.targetInRightZone();
        }


        mainActionResolver(param: HsActionParam): HsAction {

            let targetCounters: jsLogic.CounterMap = this.healParam.target.target.counters;

            if (targetCounters[DivineShieldCounter.type]) {
                delete targetCounters[DivineShieldCounter.type];
                this.healParam.amount = 0;
            }

            this.healParam.target.target.counters[HpCounter.type].value -= this.healParam.amount;

            return null;
        }


        buildOnAfterEvent(param: HsActionParam): HsActionEvent {
            return new OnAfterHealEvent(this.source, this.healParam);
        }



    }
}