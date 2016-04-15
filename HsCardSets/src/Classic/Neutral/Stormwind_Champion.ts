/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    var Stormwind_Champion: IMinion = classicSet.registerCard<IMinion>( {

        name: `Stormwind Champion`,

        cost: 7,
        attack: 6,
        health: 6,

        rarity: RARITY.COMMON,
        cardClass: CARD_CLASS.NEUTRAL,
        minion_type: MINION_TYPE.GENERAL,

        triggers: [
            AuraGenerator( {
                auraType: AURA_TYPE.ATTACK_HEALTH,

                rebuildAura: ( trigger: Trigger, event: ActionEvent, context: HsGameCtx ): Enchantment[] => {
                    let result: Enchantment[] = [];
                    TargetFinder.FRIENDLY_MINION
                        .addFilter( Filter.OtherThan( trigger.sourceCard ) )
                        .buildSet( event.param.source, context )
                        .forEach(( minion ) => {
                            result.push( new HsLogic.AttackHealthEnchantment( {
                                action: null,
                                caster: trigger.sourceCard.owner,
                                sourceType: HsLogic.SOURCE_TYPE.MINION,
                                sourceCard: trigger.sourceCard
                            }, minion, true )
                                .init( { attack: 1, health: 1 }) )
                        });

                    return result;
                }
            })
        ]
    });
}