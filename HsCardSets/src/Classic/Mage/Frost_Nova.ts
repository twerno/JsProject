/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    export var Frost_Nova: ISpell = classicSet.registerSpell( {

        name: `Frost Nova`,
        cost: 3,
        metadata: metadata( CARD_CLASS.MAGE, CARD_RARITY.COMMON ),


        spellTextAction: {
            targets: null,

            actionBuilder( source: ISource, targets: Character[], gameCtx: HsGameCtx ): Action[] {

                return [
                    gameCtx.actionFactory.freeze( {
                        source: source,
                        targets: TargetFinder.ENEMY_MINION.buildSet( source, gameCtx )
                    })
                ];

            }
        } // spellTextAction


    });
}