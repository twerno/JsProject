///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    export var Healing_Totem: IMinion = ( {

        name: `Healing Totem`,
        cost: 1,
        attack: 0,
        health: 2,
        minion_type: MINION_TYPE.GENERAL,
        metadata: metadata( CARD_CLASS.SHAMAN, CARD_RARITY.COMMON, false ),
    });
}