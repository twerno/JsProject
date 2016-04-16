/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    var Shattered_Sun_Cleric: IMinion = classicSet.registerCard<IMinion>( {

        name: `Shattered Sun Cleric`,
        cost: 2,
        attack: 3,
        health: 2,
        minion_type: MINION_TYPE.GENERAL,
        metadata: metadata( CARD_CLASS.MAGE, CARD_RARITY.COMMON ),


        battlecry: AttackHealthEnchant( {
            targets: SINGLE_OPTIONAL_TARGET( TargetFinder.FRIENDLY_MINION ),
            values: { attack: 1, health: 1 },
            expireMode: EXPIRE_MODE.PERMANENT
        }),
    });
}