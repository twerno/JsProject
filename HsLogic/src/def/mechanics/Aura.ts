"use strict";

namespace Def {

    export interface IAuraParam<T extends Permanent> {
        auraType: AURA_TYPE,
        targets: (trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx) => T[],
        rebuildAura: (trigger: Trigger, targets: Permanent[], gameCtx: HsGameCtx) => Enchantment[]
    }


    export function Aura<T extends Permanent>(param: IAuraParam<T>): IDefTrigger {
        let enchantments: Enchantment[] = [];

        return {

            keyword: KEYWORD.AURA,

            enable_self_trigger_protection: true,

            respondsTo: [HsLogic.event.AuraUpdateEvent],

            triggerable: (trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx): boolean => {
                return event instanceof HsLogic.event.AuraUpdateEvent
                    && event.param.auraType === param.auraType;
            },


            actionBuilder(trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx): Action | Action[] {
                let actions: Action[] = [],
                    newEnchantments: Enchantment[],
                    targets: T[] = param.targets(trigger, event, gameCtx);

                // usuwamy zarejestrowane aury
                for (let enchantment of enchantments)
                    actions.push(gameCtx.techActionFactory.detachEnchantment({
                        source: trigger.getSource(), enchantment: enchantment
                    }));

                // rejestrujemy nowe
                newEnchantments = param.rebuildAura(trigger, targets, gameCtx);
                for (let enchantment of newEnchantments) {
                    actions.push(gameCtx.techActionFactory.attachEnchantment({
                        source: trigger.getSource(), enchantment: enchantment
                    }));
                    enchantments.push(enchantment);
                }

                return actions;
            }
        }
    }

}