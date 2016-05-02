"use strict";

namespace Def {

    export function enrage( effectBuilder: ( trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx ) => IEffects ): IDefTrigger {

        return EffectManager(
            {
                mechanic: MECHANIC.ENRAGE,

                respondsTo: [HsLogic.event.Damage, HsLogic.event.Heal],

                triggerable: ( trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx ): boolean => {
                    if ( event instanceof HsLogic.event.Heal
                        || event instanceof HsLogic.event.Damage )
                        return event.param.target === trigger.attachedTo;
                },

                effectBuilder: ( trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx ): IEffects => {
                    let character: Character = <Character>trigger.attachedTo,
                        effects: IEffects;

                    if ( character.body.damages !== 0 ) {
                        effects = effectBuilder( trigger, event, gameCtx );
                        effects.tags = effects.tags || [];
                        effects.tags.push( new Enrage_Tag( event.param.source ) );
                        return effects;
                    }

                    return {};
                }
            }
        );

    }

}