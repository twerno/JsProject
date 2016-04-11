///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>
///<reference path="../BasicSet.ts"/>

"use strict";

namespace Def {

    var Consecration: ISpell = basicSet.registerCard<ISpell>( {
        name: `Consecration`,
        cost: 4,

        //triggers: [],
        //enchantments: [],

        playActions: [
            new AllTargetsDefAction<Character>( {
                availableTargets: SetBuilderHelper.BATTLEFIELD
                    .addFilter( StandardFilters.character ),

                actionBuilder: ( source: HsSource, targets: Character[], context: GameCtx ): Action[] => {
                    return [
                        //context.actionFactory.damage.dealDamage( {
                        //    source: source,
                        //    damageType: DAMAGE_TYPE.DIRECT,
                        //    targets: targets,
                        //    baseDamage: 2,
                        //})
                    ]
                }
            })
        ]
    });
}