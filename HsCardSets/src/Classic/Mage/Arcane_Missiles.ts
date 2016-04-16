/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    var Arcane_Missiles: ISpell = classicSet.registerCard<ISpell>( {

        name: `Arcane Missiles`,
        cost: 1,
        metadata: metadata( CARD_CLASS.MAGE, CARD_RARITY.COMMON ),


        spellTextAction: {
            targets: null,
            actionBuilder( source: ISource, targets: Character[], context: HsGameCtx ): Action[] {

                return [
                    new HsLogic.CalculateAndSplitDamage( {
                        source: source,
                        damageType: DAMAGE_TYPE.DIRECT,
                        amount: 3,
                        splitMode: SPLIT_MODE.ARCANE_MISSILE
                    })
                ];

            }
        }
    });
}