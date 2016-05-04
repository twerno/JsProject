/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    export var Sheep_Token: IMinion = classicSet.registerMinion( {

        name: `Sheep`,
        cost: 0,
        attack: 1,
        health: 1,
        minion_type: MINION_TYPE.BEAST,
        metadata: metadata( CARD_CLASS.MAGE, CARD_RARITY.COMMON, false ),
    });
}