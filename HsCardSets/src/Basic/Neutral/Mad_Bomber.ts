///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>
///<reference path="../BasicSet.ts"/>

"use strict";

namespace Def {

    var Mad_Bomber: IMinion = basicSet.registerCard<IMinion>( {
        name: `Mad Bomber`,
        cost: 2,

        attack: 3,
        hp: 2,
        minion_type: MINION_TYPE.GENERAL,

        enchantments: [],
        triggers: [],
        flags: {},
        playActions: [
            ( source: HsSource, context: GameCtx ): Action[] => {
                return [
                    context.actionFactory.damage.randomlySplitDamage( {
                        source: source,
                        damageType: DAMAGE_TYPE.DIRECT,
                        partsAmount: 3,
                        damagePerPart: 1,
                        splitMode: SPLIT_MODE.MAD_BOMB
                    })
                ]
            }
        ],


    });
}