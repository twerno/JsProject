///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>
///<reference path="../BasicSet.ts"/>

"use strict";

namespace Def {

    var Holy_Wrath: ISpell = basicSet.registerCard<ISpell>( {
        name: `Holy wrath`,
        cost: 5,

        triggers: [],
        enchantments: [],

        playActions: [
            new SingleTargetDefAction<Character>( {
                availableTargets: SetBuilderHelper.BATTLEFIELD
                    .addFilter( StandardFilters.character )
                    .addFilter( StandardFilters.targetable_by_spell_or_hero_power ),

                actionBuilder: ( source: HsSource, target: Character, context: GameCtx ): Action[] => {
                    let drawCardParam: HsLogic.DrawParam = {
                        source: source,
                        targetPlayer: source.caster,
                        drawnCard: null
                    };
                    return [
                        context.actionFactory.drawCard( drawCardParam ),

                        new jsLogic.InlineAction(( resolve, reject ): void => {

                            if ( drawCardParam.drawnCard )
                                resolve(
                                    DealDirectDamageToTarget( drawCardParam.drawnCard.cost )( source, target, context )
                                );
                            else
                                resolve( jsLogic.NO_CONSEQUENCES );
                        })
                    ]
                }
            })
        ]
    });
}