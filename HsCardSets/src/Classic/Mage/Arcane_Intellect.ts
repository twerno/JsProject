/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    export var Arcane_Intellect: ISpell = classicSet.registerSpell( {

        name: `Arcane Intellect`,
        cost: 3,
        metadata: metadata( CARD_CLASS.MAGE, CARD_RARITY.COMMON ),


        spellTextAction: {
            targets: null,

            actionBuilder( source: ISource, targets: Character[], gameCtx: HsGameCtx ): Action[] {

                return [
                    gameCtx.actionFactory.drawCards( {
                        source: source,
                        amount: 2,
                        targetPlayer: source.player,
                    })
                ];

            }
        }
    });
}