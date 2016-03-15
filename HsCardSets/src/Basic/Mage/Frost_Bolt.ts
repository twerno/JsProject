///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>
///<reference path="../BasicSet.ts"/>

"use strict";

namespace Def {

    var Frost_Bolt: ISpell = basicSet.registerCard<ISpell>( {
        name: `Frost Bolt`,
        cost: 2,

        cardType: CARD_TYPE.SPELL,
        triggers: {},
        enchantments: [],

        playActions: [
            new SingleTargetDefAction<Character>( {
                availableTargets: DefTargetHelper.BATTLEFIELD
                    .addFilter( StandardFilters.character )
                    .addFilter( StandardFilters.targetable_by_spell_or_hero_power ),

                actionBuilder: ( source: HsSource, target: Character, gameCtx: GameCtx ): Action[] => {
                    return [
                        gameCtx.actionFactory.damage.dealDamage( {
                            source: source,
                            damageType: DAMAGE_TYPE.DIRECT,
                            targets: [target],
                            baseDamage: 3,
                        }),
                        gameCtx.actionFactory.enchantment.freeze( {
                            source: source,
                            targets: [target]
                        })
                    ]
                }
            })
        ]
    });
}