/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    export var Arcane_Explosion: ISpell = classicSet.registerSpell( {

        name: `Arcane Explosion`,
        cost: 2,
        metadata: metadata( CARD_CLASS.MAGE, CARD_RARITY.COMMON ),


        spellTextAction: {
            targets: null,
            actionBuilder( source: ISource, targets: Character[], gameCtx: HsGameCtx ): Action[] {

                return [
                    gameCtx.actionFactory.calculateAndDealDamage( {
                        source: source,
                        damageType: DAMAGE_TYPE.DIRECT,
                        amount: 1,
                        targets: TargetFinder.ENEMY_MINION.buildSet( source, gameCtx )
                    })
                ];

            }
        }
    });
}