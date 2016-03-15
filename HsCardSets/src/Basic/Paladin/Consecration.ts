///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>
///<reference path="../BasicSet.ts"/>

"use strict";

namespace Def {

    var Consecration: ISpell = basicSet.registerCard<ISpell>( {
        name: `Consecration`,
        cost: 4,

        cardType: CARD_TYPE.SPELL,
        triggers: {},
        enchantments: [],

        playActions: [
            new AllTargetsDefAction<Character>( {
                availableTargets: DefTargetHelper.BATTLEFIELD
                    .addFilter( StandardFilters.character ),

                actionBuilder: ( source: HsSource, targets: Character[], gameCtx: GameCtx ): Action[] => {
                    return [
                        gameCtx.actionFactory.damage.dealDamage( {
                            source: source,
                            damageType: DAMAGE_TYPE.DIRECT,
                            targets: targets,
                            baseDamage: 2,
                        })
                    ]
                }
            })
        ]
    });
}