/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    export var Water_Elemental: IMinion = classicSet.registerMinion( {

        name: `Water Elemental`,
        cost: 4,
        attack: 3,
        health: 6,
        minion_type: MINION_TYPE.GENERAL,
        metadata: metadata( CARD_CLASS.MAGE, CARD_RARITY.COMMON ),

        mechanics: [

        ]
    });
}