"use strict";

namespace Def {


    export interface IEnrageParam {
        enrage: ( trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx ) => HsLogic.Enchantment<Permanent>;
    }


    export function enrage( param: IEnrageParam ): IDefTrigger {
        let enrageTag: Tag,
            enchantment: HsLogic.Enchantment<Permanent>;

        return {

            mechanic: MECHANIC.ENRAGE,

            enable_self_trigger_protection: false,

            respondsTo: [HsLogic.event.Damage, HsLogic.event.Heal],


            triggerable: ( trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx ): boolean => {
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


            actionBuilder( trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx ): Action | Action[] {
                let character: Character = <Character>trigger.attachedTo,
                    damaged: boolean = character.body.damages !== 0,
                    enraged: boolean = character.tags.contains( enrageTag );

                if ( !damaged && enraged ) {
                    return [
                        gameCtx.techActionFactory.removeTag( {
                            source: trigger.getSource(), targets: [character], tag: enrageTag
                        }),
                        gameCtx.techActionFactory.detachEnchantment( {
                            source: trigger.getSource(), enchantment: enchantment
                        }),
                    ];
                }

                else if ( damaged && !enraged ) {
                    enchantment = param.enrage( trigger, event, gameCtx );
                    if ( enchantment ) {
                        enrageTag = new Enrage_Tag( event.param.source );
                        return [
                            gameCtx.techActionFactory.addTag( {
                                source: trigger.getSource(), targets: [character], tag: enrageTag
                            }),
                            gameCtx.techActionFactory.attachEnchantment( {
                                source: trigger.getSource(), enchantment: enchantment
                            }),
                        ];
                    }
                }

                return null;
            }
        }
    }

}