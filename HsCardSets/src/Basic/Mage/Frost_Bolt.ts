/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    var Frost_Bolt: ISpell = basicSet.registerCard<ISpell>( {

        name: `Frost Bolt`,

        cost: 2,
        rarity: RARITY.COMMON,
        cardClass: CARD_CLASS.MAGE,

        spellTextAction: {
            targets: TARGET.SINGLE_CHARACTER,
            actionBuilder( source: ISource, targets: Character[], context: HsGameCtx ): Action[] {

                return [
                    new HsLogic.CalculateAndDealDamage( {
                        source: source,
                        damageType: DAMAGE_TYPE.DIRECT,
                        amount: 3,
                        targets: targets
                    }),
                    DefActionHelper.AddTag( {
                        source: source,
                        targets: targets,
                        tag: Freeze_Tag
                    })
                ];

            }
        }
    });
}