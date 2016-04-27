"use strict";

namespace Def {


    export function LifeLink(): IDefTrigger {
        return {

            keyword: KEYWORD.LIFE_LINK,

            enable_self_trigger_protection: false,

            respondsTo: [HsLogic.event.Damage],


            triggerable: (trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx): boolean => {
                return event instanceof HsLogic.event.Damage
                    && event.param.source.sourceCard === trigger.sourceCard
                    && event.param.amount > 0;
            },


            actionBuilder(trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx): Action | Action[] {
                let param: HsLogic.DamageParam = <HsLogic.DamageParam>event.param;

                return gameCtx.actionFactory.calculateAndHeal({
                    source: param.source,
                    targets: [trigger.owner.hero],
                    amount: param.amount,
                    cancelAction: { value: false }
                });
            }
        }
    }

}