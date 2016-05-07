/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    export var Blizzard: ISpell = classicSet.registerSpell( {

        name: `Blizzard`,
        cost: 6,
        metadata: metadata( CARD_CLASS.MAGE, CARD_RARITY.RARE ),


        spellTextAction: {
            targets: null,

            actionBuilder( source: ISource, target: Character, gameCtx: HsGameCtx ): Action[] {

                return [
                    gameCtx.actionFactory.calculateAndDealDamage( {
                        source: source,
                        damageType: DAMAGE_TYPE.DIRECT,
                        amount: 2,
                        targets: TargetFinder.ENEMY_MINION.buildSet( source, gameCtx )
                    }),
                    gameCtx.actionFactory.freeze( {
                        source: source,
                        targets: TargetFinder.ENEMY_MINION
                    })
                ];

            }
        } // spellTextAction


    });
}