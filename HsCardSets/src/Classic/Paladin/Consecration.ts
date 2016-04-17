/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    var Consecration: ISpell = classicSet.registerCard<ISpell>( {

        name: `Consecration`,
        cost: 4,
        metadata: metadata( CARD_CLASS.PALADIN, CARD_RARITY.COMMON ),

        spellTextAction: {
            targets: null,

            actionBuilder( source: ISource, targets: Character[], gameCtx: HsGameCtx ): Action[] {

                return [
                    new HsLogic.CalculateAndDealDamage( {
                        source: source,
                        damageType: DAMAGE_TYPE.DIRECT,
                        amount: 2,
                        targets: TargetFinder.EMEMY_CHARACTER.buildSet( source, gameCtx )
                    })
                ];

            }
        } // spellTextAction


    });
}