/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    // http://hearthstone.gamepedia.com/Advanced_rulebook#Drawing_a_Card
    // Holy Wrath in particular does not require the card to successfully enter your hand.[308]
    export var Holy_Wrath: ISpell = classicSet.registerSpell( {

        name: `Holy wrath`,
        cost: 5,
        metadata: metadata( CARD_CLASS.PALADIN, CARD_RARITY.RARE ),


        spellTextAction: {
            targets: SINGLE_REQUIRED_TARGET( TargetFinder.ANY_SPELL_TARGETABLE_CHARACTER ),

            actionBuilder( source: ISource, targets: Character[], gameCtx: HsGameCtx ): Action[] {

                let param: HsLogic.DrawParam = {
                    source: source, targetPlayer: source.player
                };

                return [
                    gameCtx.actionFactory.drawCard( param ),

                    new HsLogic.InlineAction(
                        ( resolve, reject ): void => {
                            resolve(
                                gameCtx.actionFactory.calculateAndDealDamage( {
                                    source: source,
                                    damageType: DAMAGE_TYPE.DIRECT,
                                    amount: param.drawnCard ? param.drawnCard.baseCost : 0,
                                    targets: targets
                                }) )
                        }
                    )
                ];

            }
        } // spellTextAction

    });
}