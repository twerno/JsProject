/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    export var Mad_Bomber: IMinion = classicSet.registerMinion( {

        name: `Mad Bomber`,
        cost: 2,
        attack: 3,
        health: 2,
        metadata: metadata( CARD_CLASS.NEUTRAL, CARD_RARITY.COMMON ),
        minion_type: MINION_TYPE.GENERAL,

        battlecry: {
            targets: null,
            actionBuilder( source: ISource, targets: Character[], gameCtx: HsGameCtx ): Action[] {
                return [
                    gameCtx.actionFactory.calculateAndSplitDamage( {
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