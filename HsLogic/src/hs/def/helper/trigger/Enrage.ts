"use strict";

namespace Def {

    export class EnrageContext {
        enrageTag: Tag;
        enchantment: HsLogic.AttackHealthEnchantment;
    }


    export function enrage(
        internalCtxBuilder: () => EnrageContext,
        registerEnrage: FTriggerActionBulder,
        unRegisterEnrage: FTriggerActionBulder ): IDefTrigger {
        return {

            keyword: KEYWORD.ENRAGE,

            disable_self_trigger_protection: true,

            respondsTo: [HsLogic.event.Damage, HsLogic.event.Heal],

            init: ( trigger: Trigger, context: HsGameCtx ): void => { trigger.internalCtx = internalCtxBuilder() },

            triggerable: ( trigger: Trigger, event: ActionEvent, context: HsGameCtx ): boolean => {
                if ( event instanceof HsLogic.event.Damage
                    && event.param.target === trigger.parent )
                    return true;

                if ( event instanceof HsLogic.event.Heal
                    && event.param.target === trigger.parent )
                    return true;

                // currenthpChange - redemption, repentance
                // maxHpSet - equality, keeper of uldaman

                return false;
            },

            actionBuilder( trigger: Trigger, event: ActionEvent, context: HsGameCtx ): Action[] {
                let character: Character = <Character>trigger.parent,
                    enraged: boolean = character.hp() !== character.health,
                    internalCtx: EnrageContext = <EnrageContext>trigger.internalCtx;

                if ( !enraged && character.tags.has( internalCtx.enrageTag ) ) {
                    character.tags.remove( internalCtx.enrageTag );
                    return unRegisterEnrage( trigger, event, context );
                }

                else if ( enraged && !character.tags.has( internalCtx.enrageTag ) ) {
                    internalCtx.enrageTag = new Enrage_Tag( event.param.source );
                    character.tags.add( internalCtx.enrageTag );
                    return registerEnrage( trigger, event, context );
                }

                return null;
            }
        }
    }

}