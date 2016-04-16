/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    var Mad_Bomber: IMinion = classicSet.registerCard<IMinion>( {

        name: `Mad Bomber`,
        cost: 2,
        attack: 3,
        health: 2,
        metadata: metadata( CARD_CLASS.NEUTRAL, CARD_RARITY.COMMON ),
        minion_type: MINION_TYPE.GENERAL,

        battlecry: {
            targets: null,
            actionBuilder( source: ISource, targets: Character[], context: HsGameCtx ): Action[] {
                return [
                    new HsLogic.CalculateAndSplitDamage( {
                        source: source,
                        damageType: DAMAGE_TYPE.DIRECT,
                        amount: 3,
                        splitMode: SPLIT_MODE.MAD_BOMB
                    })
                ];
            }
        },
    });
}