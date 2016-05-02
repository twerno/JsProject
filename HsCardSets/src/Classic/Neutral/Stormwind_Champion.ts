/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    export var Stormwind_Champion: IMinion = classicSet.registerMinion( {

        name: `Stormwind Champion`,
        cost: 7,
        attack: 6,
        health: 6,
        minion_type: MINION_TYPE.GENERAL,
        metadata: metadata( CARD_CLASS.NEUTRAL, CARD_RARITY.COMMON ),


        aura: [
            {
                auraType: AURA_TYPE.ATTACK_HEALTH,

                targetBuilder: ( aura: Aura ): ISetBuilder<PermanentExt> => {
                    return TargetFinder.FRIENDLY_MINION
                        .addFilter( Filter.OtherThan( aura.auraBearer ) );
                },

                effectBuilder: ( self: Aura, target: PermanentExt, gameCtx: HsGameCtx ): IEffects => {
                    return {
                        enchantments: [
                            new HsLogic.AttackHealthEnchantment( self.getSource(), <Minion | Hero>target, true )
                                .init( { attack: 1, health: 1 })
                        ]
                    }
                }
            }
        ],

    });
}