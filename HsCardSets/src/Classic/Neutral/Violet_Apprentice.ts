/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    export var Violet_Apprentice: IMinion = classicSet.registerMinion( {

        name: `Violet Apprentice`,
        cost: 0,
        attack: 1,
        health: 1,
        metadata: metadata( CARD_CLASS.NEUTRAL, CARD_RARITY.COMMON, false ),
        minion_type: MINION_TYPE.GENERAL,

    });
}