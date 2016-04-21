/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    var Mistress_of_Pain: IMinion = naxxSet.registerMinion( {

        name: `Mistress of Pain`,

        cost: 2,
        attack: 1,
        health: 4,
        minion_type: MINION_TYPE.DEMON,
        metadata: metadata( CARD_CLASS.WARLOCK, CARD_RARITY.RARE ),


        triggers: [
            LifeLink()
        ]
    });
}