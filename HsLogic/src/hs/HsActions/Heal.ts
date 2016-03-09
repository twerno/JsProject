///<reference path="../core/HsAction.ts"/>
///<reference path="../../core/action/abstractActions/CancelableAction.ts"/>

"use strict";

namespace HSLogic {

    export interface HealParam extends HsActionParam {
        source: Card,
        cancelHeal: boolean,
        amount: number,
        target: LivingTarget,
    }


    export class HealCalculationEvent extends HsActionEvent<HealParam> {

        static get type(): string { return HealCalculationEvent.name }
    }



    export class OnAfterHealEvent extends HsActionEvent<HealParam> {

        static get type(): string { return OnAfterHealEvent.name }
    }




    /**
     * Heal
     *
     */
    export class Heal extends jsLogic.CancelableAction<HsGameCtx, HealParam> {

        cancelAction(eventParam: HealParam): boolean { return eventParam.cancelHeal }
        cancelOnAfterEvent(eventParam: HealParam): boolean { return false }

        onBeforeEventBuilder(eventParam: HealParam): HsActionEvent<HealParam> { return new HealCalculationEvent(eventParam) }
        onAfterEventBuilder(eventParam: HealParam): HsActionEvent<HealParam> { return new OnAfterHealEvent(eventParam) }


        resolve(_this_: Heal, gameCtx: HsGameCtx): PromiseOfActions {
            return new Promise<HsAction[]>(

                (resolve, reject): void => {
                    let targetCounters: jsLogic.CounterMap = _this_.param.target.target.counters;

                    if (targetCounters[DivineShieldCounter.type]) {
                        delete targetCounters[DivineShieldCounter.type];
                        _this_.param.amount = 0;
                    }

                    _this_.param.target.target.hp -= _this_.param.amount;

                    return null;
                }
            );
        }
    }
}