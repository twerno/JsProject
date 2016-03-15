///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>
///<reference path="../BasicSet.ts"/>

"use strict";

namespace Def {

    var Mad_Bomber: IMinion = basicSet.registerCard<IMinion>( {
        name: `Mad Bomber`,
        cost: 2,

        cardType: CARD_TYPE.MINION,
        minion_type: MINION_TYPE.GENERAL,

        attack: 3,
        hp: 2,
        enchantments: [],

        flags: {},
        playActions: [
            ( source: HsSource, gameCtx: GameCtx ): Action[] => {
                return [
                    gameCtx.actionFactory.damage.randomlySplitDamage( {
                        source: source,
                        damageType: DAMAGE_TYPE.DIRECT,
                        partsAmount: 3,
                        damagePerPart: 1,
                        splitMode: SPLIT_MODE.MAD_BOMB
                    })
                ]
            }
        ],
        triggers: {}

    });
}