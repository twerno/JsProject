/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    export var Holy_Wrath: ISpell = classicSet.registerSpell( {

        name: `Holy wrath`,
        cost: 5,
        metadata: metadata( CARD_CLASS.PALADIN, CARD_RARITY.RARE ),


        spellTextAction: {
            targets: SINGLE_REQUIRED_TARGET( TargetFinder.ANY_SPELL_TARGETABLE_CHARACTER ),

            actionBuilder( source: ISource, targets: Character[], gameCtx: HsGameCtx ): Action[] {
                let param: HsLogic.DrawParam = {
                    source: source,
                    targetPlayer: source.player
                };

                return [
                    gameCtx.actionFactory.drawCard( param ),

                    new HsLogic.InlineActionExt(
                        (): boolean => { return param.drawnCard !== null },
                        ( resolve, reject ): void => {
                            resolve(
                                new HsLogic.CalculateAndDealDamage( {
                                    source: source,
                                    damageType: DAMAGE_TYPE.DIRECT,
                                    amount: param.drawnCard.baseCost,
                                    targets: targets
                                }) )
                        }
                    )
                ];

            }
        } // spellTextAction

    });
}