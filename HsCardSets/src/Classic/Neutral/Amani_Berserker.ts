/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    export var Amani_Berserker: IMinion = classicSet.registerMinion( {

        name: `Amani Berserker`,
        cost: 2,
        attack: 2,
        health: 3,
        minion_type: MINION_TYPE.GENERAL,
        metadata: metadata( CARD_CLASS.NEUTRAL, CARD_RARITY.COMMON ),

        mechanics: [
            enrage(
                ( trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx ): IEffects => {
                    let buff: Enchantment = new HsLogic.AttackHealthEnchantment( event.param.source, <Character>trigger.attachedTo )
                        .init( { attack: 3, health: 0 });

                    return { enchantments: [buff] }
                })
        ],
    });
}