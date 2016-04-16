"use strict";

namespace Def {

    export class EnrageContext {
        enrageTag: Tag;
        enchantment: HsLogic.AttackHealthEnchantment;
    }

    export interface IEnrageParam<T extends EnrageContext> {
        init: ( trigger: Trigger, context: HsGameCtx ) => T,
        enrage: FInnerTriggActionBuilder<T>,
        backToNormal: FInnerTriggActionBuilder<T>
    }


    export function enrage<T extends EnrageContext>( param: IEnrageParam<T> ): IDefTrigger {
        return {

            keyword: KEYWORD.ENRAGE,

            enable_self_trigger_protection: true,

            respondsTo: [HsLogic.event.Damage, HsLogic.event.Heal],


            init: ( trigger: Trigger, context: HsGameCtx ): void => {
                trigger.internalCtx = param.init( trigger, context );
            },


            triggerable: ( trigger: Trigger, event: ActionEvent, context: HsGameCtx ): boolean => {
                if ( event instanceof HsLogic.event.Damage
                    && event.param.target === trigger.attachedTo )
                    return true;

                if ( event instanceof HsLogic.event.Heal
                    && event.param.target === trigger.attachedTo )
                    return true;

                // currenthpChange - redemption, repentance
                // maxHpSet - equality, keeper of uldaman

                return false;
            },


            actionBuilder( trigger: Trigger, event: ActionEvent, context: HsGameCtx ): Action | Action[] {
                let character: Character = <Character>trigger.attachedTo,
                    internalCtx: T = <T>trigger.internalCtx,
                    damaged: boolean = character.body.damages !== 0,
                    enraged: boolean = character.tags.contains( internalCtx.enrageTag );

                if ( !damaged && enraged ) {
                    character.tags.remove( internalCtx.enrageTag );
                    return param.enrage( trigger, event, internalCtx, context );
                }

                else if ( damaged && !enraged ) {
                    internalCtx.enrageTag = new Enrage_Tag( event.param.source );
                    character.tags.add( internalCtx.enrageTag );
                    return param.backToNormal( trigger, event, internalCtx, context );
                }

                return null;
            }
        }
    }

}