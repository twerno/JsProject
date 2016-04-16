﻿/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    var Stormwind_Champion: IMinion = classicSet.registerCard<IMinion>( {

        name: `Stormwind Champion`,
        cost: 7,
        attack: 6,
        health: 6,
        minion_type: MINION_TYPE.GENERAL,
        metadata: metadata( CARD_CLASS.NEUTRAL, CARD_RARITY.COMMON ),


        triggers: [
            AuraGenerator<Minion>( {
                auraType: AURA_TYPE.ATTACK_HEALTH,

                targets: ( trigger: Trigger, event: ActionEvent, context: HsGameCtx ): Minion[] => {
                    return TargetFinder.FRIENDLY_MINION
                        .addFilter( Filter.OtherThan( trigger.sourceCard ) )
                        .buildSet( trigger.getSource(), context );
                },

                rebuildAura: ( trigger: Trigger, targets: Minion[], context: HsGameCtx ): Enchantment[] => {
                    let result: Enchantment[] = [];

                    targets.forEach(( minion ) => {
                        result.push(
                            new HsLogic.AttackHealthEnchantment( trigger.getSource(), minion, true )
                                .init( { attack: 1, health: 1 }) )
                    });

                    return result;
                }
            })
        ]
    });
}