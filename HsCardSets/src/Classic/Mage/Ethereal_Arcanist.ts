/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    export var Ethereal_Arcanist: IMinion = classicSet.registerMinion( {

        name: `Ethereal Arcanist`,
        cost: 4,
        attack: 3,
        health: 3,
        minion_type: MINION_TYPE.GENERAL,
        metadata: metadata( CARD_CLASS.MAGE, CARD_RARITY.RARE ),

        mechanics: [
            {
                mechanic: MECHANIC.NONE,

                enable_self_trigger_protection: false,

                respondsTo: [HsLogic.event.EndOfTurn],

                triggerable: ( trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx ): boolean => {
                    return trigger.owner === gameCtx.activePlayer
                        && gameCtx.gameBoard.zonesOf( gameCtx.activePlayer ).secret.length > 0;
                },

                actionBuilder( trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx ): Action[] {
                    let enchantment: HsLogic.Enchantment<Minion>
                        = new HsLogic.AttackHealthEnchantment( trigger.getSource(), <Minion>trigger.attachedTo )
                            .init( { attack: 2, health: 2 });

                    return [
                        gameCtx.techActionFactory.attachEnchantment( {
                            source: trigger.getSource(),
                            enchantment: enchantment
                        })
                    ];
                }
            }
        ]
    });
}