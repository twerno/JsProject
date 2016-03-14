///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>
///<reference path="../BasicSet.ts"/>

"use strict";

namespace HSLogic {

    var Mad_Bomber: IMinion = {
        name: `Mad Bomber`,
        cost: 2,

        card_type: CARD_TYPE.MINION,
        minion_type: MINION_TYPE.GENERAL,

        attack: 3,
        hp: 2,
        enchantments: [],

        flags: {},

        battlecry: [
            {
                actionsBuilder: ( source: IHsSource, gameCtx: HsGameCtx ): jsLogic.IAction<HsGameCtx>[] => {
                    return [
                        gameCtx.actionFactory.damage.randomlySplitDamage( {
                            source: source,
                            damageType: DAMAGE_TYPE.DIRECT,
                            sourceType: SOURCE_TYPE.MINION,
                            partsAmount: 3,
                            damagePerPart: 1,
                            splitMode: SPLIT_MODE.MAD_BOMB
                        })
                    ]
                }

            }
        ]
    }

    basicSet.registerCard( Mad_Bomber );
}