/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    export var Mirror_Image_Token: IMinion = classicSet.registerMinion( {

        name: `Mirror Image`,
        cost: 0,
        attack: 0,
        health: 2,
        minion_type: MINION_TYPE.GENERAL,
        metadata: metadata( CARD_CLASS.MAGE, CARD_RARITY.COMMON, false ),

        tags: [
            Taunt_Tag
        ]
    });
}