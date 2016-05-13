"use strict";

namespace Def {


    export interface IEffectManagerParam {

        mechanic?: string,


        triggerPriority?: number,


        respondsTo: ActionEventClass | ActionEventClass[],


        triggerable?: FTriggerable;


        effectBuilder: ( trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx ) => IEffects;
    }


    export function EffectManager( param: IEffectManagerParam ): IDefTrigger {
        let managedEffects: Def.IEffects = {
            tags: [], triggers: [], enchantments: []
        };

        return {

            mechanic: param.mechanic || MECHANIC.NONE,

            enable_self_trigger_protection: true,

            respondsTo: param.respondsTo || [],

            triggerable: param.triggerable || null,

            actionBuilder( trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx ): Action[] {
                let newEffects: IEffects = param.effectBuilder( trigger, event, gameCtx ),
                    source: ISource = trigger.getSource();

                return HsLogic.tagsOperations( source, trigger.attachedTo, managedEffects.tags, newEffects.tags || [], gameCtx )
                    .concat( HsLogic.triggersOperations( source, managedEffects.triggers, newEffects.triggers || [], gameCtx ) )
                    .concat( HsLogic.enchantmentsOperations( source, managedEffects.enchantments, newEffects.enchantments || [], gameCtx ) );
            }
        }
    }

}