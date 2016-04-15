"use strict";

namespace Def {

    export interface IDeathrattleParam {
        action: FTriggerActionBulder
    }

    export function Deathrattle<T extends IDeathrattleParam>( param: T ): IDefTrigger {
        return {

            keyword: KEYWORD.DEATHRATTLE,

            disable_self_trigger_protection: true,

            respondsTo: [HsLogic.event.Death],


            init: ( trigger: Trigger, context: HsGameCtx ): void => { },


            triggerable: ( trigger: Trigger, event: ActionEvent, context: HsGameCtx ): boolean => {
                return event instanceof HsLogic.event.Death
                    && event.param.target === trigger.sourceCard;
            },


            actionBuilder( trigger: Trigger, event: ActionEvent, context: HsGameCtx ): Action | Action[] {
                return param.action( trigger, event, context );
            }
        }
    }

}