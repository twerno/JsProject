/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    export var Frost_Bolt: ISpell = classicSet.registerSpell( {

        name: `Frost Bolt`,
        cost: 2,
        metadata: metadata( CARD_CLASS.MAGE, CARD_RARITY.COMMON ),


        spellTextAction: {
            targets: SINGLE_REQUIRED_TARGET( TargetFinder.ANY_SPELL_TARGETABLE_CHARACTER ),

            actionBuilder( source: ISource, targets: Character[], gameCtx: HsGameCtx ): Action[] {

                return [
                    gameCtx.actionFactory.calculateAndDealDamage( {
                        source: source,
                        damageType: DAMAGE_TYPE.DIRECT,
                        amount: 3,
                        targets: targets
                    }),
                    gameCtx.actionFactory.freeze( {
                        source: source,
                        targets: targets
                    })
                ];

            }
        } // spellTextAction


    });
}