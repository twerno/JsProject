/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    var Mistress_of_Pain: IMinion = curseSet.registerCard<IMinion>( {

        name: `Mistress of Pain`,

        cost: 2,
        attack: 1,
        health: 4,

        rarity: RARITY.RARE,
        cardClass: CARD_CLASS.WARLOCK,
        minion_type: MINION_TYPE.DEMON,

        triggers: [
            LifeLink()
        ]
    });
}