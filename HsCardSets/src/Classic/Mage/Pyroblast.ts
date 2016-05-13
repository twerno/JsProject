/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    export var Pyroblast: ISpell = classicSet.registerSpell( {

        name: `Pyroblast`,
        cost: 10,
        metadata: metadata( CARD_CLASS.MAGE, CARD_RARITY.EPIC ),


        spellTextAction: {
            targets: SINGLE_REQUIRED_TARGET( TargetFinder.ANY_SPELL_TARGETABLE_CHARACTER ),

            actionBuilder( source: ISource, targets: Character[], gameCtx: HsGameCtx ): Action[] {

                return [
                    gameCtx.actionFactory.calculateAndDealDamage( {
                        source: source,
                        damageType: DAMAGE_TYPE.DIRECT,
                        amount: 10,
                        targets: targets
                    }),
                ];

            }
        } // spellTextAction


    });
}