/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    export var Arcane_Blast: ISpell = tournamentSet.registerSpell( {

        name: `Arcane Blast`,
        cost: 1,
        metadata: metadata( CARD_CLASS.MAGE, CARD_RARITY.EPIC ),


        spellTextAction: {

            targets: SINGLE_REQUIRED_TARGET( TargetFinder.ANY_SPELL_TARGETABLE_MINION ),

            actionBuilder( source: ISource, targets: Character[], gameCtx: HsGameCtx ): Action[] {

                return [
                    gameCtx.actionFactory.calculateAndDealDamage( {
                        source: source,
                        damageType: DAMAGE_TYPE.DIRECT,
                        amount: 2,
                        targets: targets,

                        customDamageBoostCalculator: ( param: HsLogic.CalculateDamageParam, gameCtx: HsGameCtx ): number => {
                            return gameCtx.powerMgr.damageBoost( param, gameCtx ) * 2;
                        }
                    })
                ];

            }
        } // spellTextAction


    });
}