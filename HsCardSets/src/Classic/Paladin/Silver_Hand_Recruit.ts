/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    export var Silver_Hand_Recruit: IMinion = classicSet.registerMinion( {

        name: `Silver Hand Recruit`,
        cost: 2,
        attack: 1,
        health: 1,
        minion_type: MINION_TYPE.GENERAL,
        metadata: metadata( CARD_CLASS.NEUTRAL, CARD_RARITY.COMMON, false ),
    });
}