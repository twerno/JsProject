//"use strict";

//namespace Def {

//    export class AuraGeneratorContext {
//        enchantments: Enchantment[] = [];
//    }

//    export interface IAuraGeneratorParam {
//        ctx?: AuraGeneratorContext,
//        auraType: AURA_TYPE,
//        rebuildAura: ( trigger: Trigger, event: ActionEvent, context: HsGameCtx ) => Enchantment[]
//    }


//    export function AuraGenerator( param: IAuraGeneratorParam ): IDefTrigger {
//        return {

//            keyword: KEYWORD.AURA,

//            disable_self_trigger_protection: false,

//            respondsTo: [HsLogic.event.AuraUpdateEvent],


//            init: ( trigger: Trigger, context: HsGameCtx ): void => {
//                param.ctx = new AuraGeneratorContext();
//            },


//            triggerable: ( trigger: Trigger, event: ActionEvent, context: HsGameCtx ): boolean => {
//                return event instanceof HsLogic.event.AuraUpdateEvent
//                    && event.param.auraType === param.auraType;
//            },


//            actionBuilder( trigger: Trigger, event: ActionEvent, context: HsGameCtx ): Action | Action[] {
//                let actions: Action[] = [],
//                    newEnchantments: Enchantment[];

//                // usuwamy zarejestrowane aury
//                actions.push( DefActionHelper.DetachEnchantments( param.ctx.enchantments ) );

//                // rejestrujemy nowe
//                newEnchantments = param.rebuildAura( trigger, event, context );
//                for ( let enchantment of newEnchantments ) {
//                    actions.push( DefActionHelper.AttachEnchantment( enchantment ) );
//                    param.ctx.enchantments.push( enchantment );
//                }

//                return actions;
//            }
//        }
//    }

//}