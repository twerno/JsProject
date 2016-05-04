/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    export var Fireball: ISpell = classicSet.registerSpell( {

        name: `Fireball`,
        cost: 4,
        metadata: metadata( CARD_CLASS.MAGE, CARD_RARITY.COMMON ),


        spellTextAction: {
            targets: SINGLE_REQUIRED_TARGET( TargetFinder.ANY_SPELL_TARGETABLE_CHARACTER ),

            actionBuilder( source: ISource, targets: Character[], gameCtx: HsGameCtx ): Action[] {

                return [
                    gameCtx.actionFactory.calculateAndDealDamage( {
                        source: source,
                        damageType: DAMAGE_TYPE.DIRECT,
                        amount: 6,
                        targets: targets
                    }),
                ];

            }
        } // spellTextAction


    });
}