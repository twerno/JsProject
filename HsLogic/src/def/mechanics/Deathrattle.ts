"use strict";

namespace Def {

    export interface IDeathrattleParam {
        action: FTriggerActionBulder
    }

    export function Deathrattle<T extends IDeathrattleParam>( param: T ): IDefTrigger {
        return {

            keyword: KEYWORD.DEATHRATTLE,

            enable_self_trigger_protection: false,

            respondsTo: [HsLogic.event.Death],


            triggerable: ( trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx ): boolean => {
                return event instanceof HsLogic.event.Death
                    && event.param.target === trigger.sourceCard;
            },


            actionBuilder( trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx ): Action | Action[] {
                return param.action( trigger, event, gameCtx );
            }
        }
    }

}