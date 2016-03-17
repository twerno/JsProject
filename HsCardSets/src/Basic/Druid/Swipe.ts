///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>
///<reference path="../BasicSet.ts"/>

"use strict";

namespace Def {

    var Swipe: ISpell = basicSet.registerCard<ISpell>( {
        name: `Swipe`,
        cost: 2,

        triggers: [],
        enchantments: [],

        playActions: [
            // dealDamageAction
            //   - source
            //   - DAMAGE_TYPE
            //   - targets: {characters: Characters[], amount: number}[]
            //   susspend activation of any event untill all is done
            new TwoStepsTargetsDefAction<Character>( {
                step1: {
                    availableTargets: SetBuilderHelper.BATTLEFIELD
                        .addFilter( StandardFilters.character )
                        .addFilter( StandardFilters.targetable_by_spell_or_hero_power ),

                    actionBuilder: DealDirectDamageToTarget( 4 )
                },
                step2: {
                    availableTargets: ( step1Target: Character ): IDefSetBuilder => {
                        return SetBuilderHelper.BATTLEFIELD
                            .addFilter( StandardFilters.character )
                            .addFilter( EntityFilter.VALUE( step1Target ).other_than );
                    },
                    actionBuilder: DealDirectDamageToTargets( 1 )
                }
            })
        ]
    });
}