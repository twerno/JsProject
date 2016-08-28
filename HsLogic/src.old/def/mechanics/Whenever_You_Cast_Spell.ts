"use strict";

namespace Def {

    export function Whenever_You_Cast_Spell( action: FTriggerActionBulder ): IDefTrigger {
        return {

            mechanic: MECHANIC.WHENEVER_YOU_CAST_SPELL,

            enable_self_trigger_protection: true,

            respondsTo: [HsLogic.OnPlayPhaseEvent],


            triggerable: ( trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx ): boolean => {
                return event instanceof HsLogic.OnPlayPhaseEvent
                    && event.param.card instanceof HsLogic.Spell;
            },


            actionBuilder( trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx ): Action[] {
                return action( trigger, event, gameCtx );
            }
        }
    }

}