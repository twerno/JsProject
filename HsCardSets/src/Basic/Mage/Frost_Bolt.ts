///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>
///<reference path="../BasicSet.ts"/>

"use strict";

namespace HSLogic {

    var Frost_Bolt: ISpell = {
        name: `Frost Bolt`,
        cost: 2,

        card_type: CARD_TYPE.SPELL,

        spellActions: [
            {
                availableTargets: DefTargetSetBuilder.CHARACTER.TARGETABLE_BY_SPELL_OR_HERO_POWER,
                makeAChoice: MakeAChoiceAtRandom.builder({ amount: 1 }),
                validateChoosen: (param: ChooseActionParam, gameCtx: HsGameCtx): boolean => { return true },
                actionBuilder: (param: ChooseActionParam, gameCtx: HsGameCtx): jsLogic.IAction<HsGameCtx> => {
                    return gameCtx.actionFactory.damage.dealDamage({
                        damageType: DAMAGE_TYPE.DIRECT,
                        sourceType: SOURCE_TYPE.SPELL,
                        source: param.source,
                        targets: param.sets.result,
                        baseDamage: 3
                    });
                }

            }
        ]
    }

    basicSet.registerCard(Frost_Bolt);
}