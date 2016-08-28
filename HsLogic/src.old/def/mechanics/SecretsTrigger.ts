"use strict";

namespace Def {

    export interface SecretsTriggerParam {
        respondsTo: ActionEventClass | ActionEventClass[],

        triggerable?: FTriggerable;

        actionBuilder: FTriggerActionBulder,
    }

    export function SecretsTrigger( param: SecretsTriggerParam ): IDefTrigger {
        return {

            mechanic: MECHANIC.SECRET,

            enable_self_trigger_protection: true,

            respondsTo: param.respondsTo,

            triggerable: ( trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx ): boolean => {
                return param.triggerable( trigger, event, gameCtx );
            },

            actionBuilder( trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx ): Action[] {
                let actions: Action[] = param.actionBuilder( trigger, event, gameCtx ) || [];

                return actions.concat( gameCtx.actionFactory.removeSecret( {
                    source: trigger.getSource(),
                    secret: <Secret>trigger.attachedTo
                }) );
            }
        }
    }

}