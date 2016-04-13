"use strict";

namespace Def {

    class EnrageContext {
        enrageTag: Tag
    }

    function enrage(): IDefTrigger {
        return {

            disable_self_trigger_protection: true,

            respondsTo: [HsLogic.event.Damage, HsLogic.event.Heal],

            init: ( trigger: Trigger, context: HsGameCtx ): void => {
                let triggerCtx: EnrageContext = new EnrageContext();
                triggerCtx.enrageTag = new Enrage_Tag( {});

                trigger.triggerContext = triggerCtx;

            },

            triggerable: ( trigger: Trigger, event: ActionEvent, context: HsGameCtx ): boolean => {
                if ( event instanceof HsLogic.event.Damage
                    && event.param.target === trigger.parent )
                    return true;

                if ( event instanceof HsLogic.event.Heal
                    && event.param.target === trigger.parent )
                    return true;

                // hpChange - redemption, repentance

                return false;
            },

            actionBuilder: ( trigger: Trigger, event: ActionEvent, context: HsGameCtx ): Action[] => {
                let character: Character = <Character>trigger.parent,
                    triggCtx: EnrageContext = <EnrageContext>trigger.triggerContext,
                    actions: Action[] = [];

                if ( character.hp === character.maxHp && character.tags.has( triggCtx.enrageTag ) ) {
                    character.tags.remove( triggCtx.enrageTag );
                }

                else if ( character.hp !== character.maxHp && !character.tags.has( triggCtx.enrageTag ) ) {
                    character.tags.add( triggCtx.enrageTag );
                }

                return actions;
            }
        }
    }

    //export interface IDefTrigger {

    //    triggerPriority?: number,

    //    respondsTo: ActionEventClass | ActionEventClass[],

    //    // http://hearthstone.gamepedia.com/Advanced_rulebook#Glossary
    //    // Humble safeguard: Minions are not allowed to trigger on themselves entering play.
    //    disable_self_trigger_protection?: boolean,

    //    triggerable?: FTriggerable;

    //    actionBuilder: FTriggerActionBulder
    //}


    //var enrage: IDefTrigger = {
    //    respondsTo: [HsLogic.event.Damage, HsLogic.event.Heal],
    //    disable_self_trigger_protection: true,
    //    triggerable: ( self: Trigger, event: ActionEvent, context: HsGameCtx ): boolean => {
    //        return true;
    //    },
    //    actionBuilder: ( self: Trigger, event: ActionEvent, context: HsGameCtx ): Action[] => {
    //        return null;
    //    }
    //}

}