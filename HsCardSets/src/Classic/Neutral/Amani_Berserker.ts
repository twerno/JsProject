/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    var Amani_Berserker: IMinion = classicSet.registerMinion( {

        name: `Amani Berserker`,
        cost: 2,
        attack: 2,
        health: 3,
        minion_type: MINION_TYPE.GENERAL,
        metadata: metadata( CARD_CLASS.NEUTRAL, CARD_RARITY.COMMON ),

        triggers: [
            enrage( {

                enrage: ( trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx ): HsLogic.Enchantment<Permanent> => {
                    return new HsLogic.AttackHealthEnchantment( event.param.source, <Character>trigger.attachedTo )
                        .init( { attack: 3, health: 0 });
                }
            })
        ],
    });
}