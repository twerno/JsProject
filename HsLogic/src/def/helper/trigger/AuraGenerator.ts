"use strict";

namespace Def {

    export interface IAuraGeneratorParam<T extends Permanent> {
        auraType: AURA_TYPE,
        targets: ( trigger: Trigger, event: ActionEvent, context: HsGameCtx ) => T[],
        rebuildAura: ( trigger: Trigger, targets: Permanent[], context: HsGameCtx ) => Enchantment[]
    }


    export function AuraGenerator<T extends Permanent>( param: IAuraGeneratorParam<T> ): IDefTrigger {
        let enchantments: Enchantment[] = [];

        return {

            keyword: KEYWORD.AURA,

            enable_self_trigger_protection: true,

            respondsTo: [HsLogic.event.AuraUpdateEvent],

            triggerable: ( trigger: Trigger, event: ActionEvent, context: HsGameCtx ): boolean => {
                return event instanceof HsLogic.event.AuraUpdateEvent
                    && event.param.auraType === param.auraType;
            },


            actionBuilder( trigger: Trigger, event: ActionEvent, context: HsGameCtx ): Action | Action[] {
                let actions: Action[] = [],
                    newEnchantments: Enchantment[],
                    targets: T[] = param.targets( trigger, event, context );

                // usuwamy zarejestrowane aury
                actions.push( DefActionHelper.DetachEnchantments( enchantments ) );

                // rejestrujemy nowe
                newEnchantments = param.rebuildAura( trigger, targets, context );
                for ( let enchantment of newEnchantments ) {
                    actions.push( DefActionHelper.AttachEnchantment( enchantment ) );
                    enchantments.push( enchantment );
                }

                return actions;
            }
        }
    }

}