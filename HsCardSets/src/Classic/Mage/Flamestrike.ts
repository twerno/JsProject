/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    export var Flamestrike: ISpell = classicSet.registerSpell( {

        name: `Flamestrike`,
        cost: 7,
        metadata: metadata( CARD_CLASS.MAGE, CARD_RARITY.COMMON ),


        spellTextAction: {
            targets: null,

            actionBuilder( source: ISource, targets: Character[], gameCtx: HsGameCtx ): Action[] {

                return [
                    gameCtx.actionFactory.calculateAndDealDamage( {
                        source: source,
                        damageType: DAMAGE_TYPE.DIRECT,
                        amount: 4,
                        targets: TargetFinder.ENEMY_MINION.buildSet( source, gameCtx )
                    }),
                ];

            }
        } // spellTextAction


    });
}