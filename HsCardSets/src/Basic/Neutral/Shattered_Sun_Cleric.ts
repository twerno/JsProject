/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    var Shattered_Sun_Cleric: IMinion = basicSet.registerCard<IMinion>( {

        name: `Shattered Sun Cleric`,

        cost: 2,
        attack: 3,
        health: 2,

        rarity: RARITY.COMMON,
        cardClass: CARD_CLASS.NEUTRAL,
        minion_type: MINION_TYPE.GENERAL,

        battlecry: null,
    });
}