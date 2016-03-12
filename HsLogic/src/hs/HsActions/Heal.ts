///<reference path="../core/HsAction.ts"/>
///<reference path="../../core/action/abstractActions/CancelableAction.ts"/>

"use strict";

namespace HSLogic {

    export interface HealParam extends HsActionParam {
        cancelHeal: boolean,
        amount: number,
        target: LivingTarget,
    }


    export class HealCalculationEvent<P extends HealParam> extends HsActionEvent<P> {
        static get type(): string { return HealCalculationEvent.name }
    }



    export class OnAfterHealEvent<P extends HealParam> extends HsActionEvent<P> {
        static get type(): string { return OnAfterHealEvent.name }
    }




    /**
     * Heal
     *
     */
    export class Heal<P extends HealParam> extends jsLogic.CancelableAction<HsGameCtx, P> {

        cancelAction( eventParam: P ): boolean { return eventParam.cancelHeal }
        cancelOnAfterEvent( eventParam: P ): boolean { return false }

        onBeforeEventBuilder( eventParam: P ): HsActionEvent<P> { return new HealCalculationEvent( eventParam ) }
        onAfterEventBuilder( eventParam: P ): HsActionEvent<P> { return new OnAfterHealEvent( eventParam ) }


        resolve( _this_: Heal<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(

                ( resolve, reject ): void => {
                    let param: P = _this_.param,
                        targetCounters: jsLogic.CounterMap = param.target.target.counters;

                    if ( targetCounters[DivineShieldCounter.type] ) {
                        delete targetCounters[DivineShieldCounter.type];
                        param.amount = 0;
                    }

                    param.target.target.hp -= param.amount;

                    return null;
                });
        }
    }
}