///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>
///<reference path="../BasicSet.ts"/>

"use strict";

namespace HSLogic {

    var Frost_Bolt: ISpell = basicSet.registerCard<ISpell>( {
        name: `Frost Bolt`,
        cost: 2,

        cardType: CARD_TYPE.SPELL,
        triggers: {},
        enchantments: [],

        spellActions: [
            {
                availableTargets: DefTargetSetBuilder.CHARACTER.TARGETABLE_BY_SPELL_OR_HERO_POWER,
                makeAChoice: MakeAChoiceAtRandom.builder<Player | Minion>( { amount: 1 }),
                validateChoosen: ( param: ChooseActionParam<Player | Minion>, gameCtx: HsGameCtx ): boolean => { return true },
                actions: ( param: ChooseActionParam<Player | Minion>, gameCtx: HsGameCtx ): jsLogic.IAction<HsGameCtx>[] => {
                    return [
                        gameCtx.actionFactory.damage.dealDamage( {
                            damageType: DAMAGE_TYPE.DIRECT,
                            //sourceType: SOURCE_TYPE.SPELL,
                            source: param.source,
                            targets: param.sets.result,
                            baseDamage: 3
                        }),
                        gameCtx.actionFactory.enchantment.freeze( {
                            source: param.source,
                            //sourceType: SOURCE_TYPE.SPELL,
                            targets: param.sets.result
                        })
                    ]
                }
            }
        ]
    });
}