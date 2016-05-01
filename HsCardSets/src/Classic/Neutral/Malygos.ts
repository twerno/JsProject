/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    export var Malygos: IMinion = classicSet.registerMinion( {

        name: `Malygos`,
        cost: 9,
        attack: 4,
        health: 12,
        metadata: metadata( CARD_CLASS.NEUTRAL, CARD_RARITY.LEGENDARY ),
        minion_type: MINION_TYPE.DRAGON,

        aura: [
            SpellDamageAura( TargetFinder.PLAYER, 5 )
        ]

    });
}