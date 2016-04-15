"use strict";

namespace Def {


    export function LifeLink(): IDefTrigger {
        return {

            keyword: KEYWORD.LIFE_LINK,

            disable_self_trigger_protection: true,

            respondsTo: [HsLogic.event.Damage],


            init: ( trigger: Trigger, context: HsGameCtx ): void => { },


            triggerable: ( trigger: Trigger, event: ActionEvent, context: HsGameCtx ): boolean => {
                return event instanceof HsLogic.event.Damage
                    && event.param.source.sourceCard === trigger.sourceCard
                    && event.param.amount > 0;
            },


            actionBuilder( trigger: Trigger, event: ActionEvent, context: HsGameCtx ): Action | Action[] {
                let param: HsLogic.DamageParam = <HsLogic.DamageParam>event.param;

                return new HsLogic.CalculateAndHeal( {
                    source: param.source,
                    targets: [trigger.owner],
                    amount: param.amount,
                    cancelAction: { value: false }
                });
            }
        }
    }

}