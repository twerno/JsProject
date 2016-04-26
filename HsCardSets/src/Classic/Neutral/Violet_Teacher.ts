/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    export var Violet_Teacher: IMinion = classicSet.registerMinion( {

        name: `Violet Teacher`,
        cost: 4,
        attack: 3,
        health: 5,
        metadata: metadata( CARD_CLASS.NEUTRAL, CARD_RARITY.RARE ),
        minion_type: MINION_TYPE.GENERAL,

        triggers: [
            Whenever_You_Cast_Spell(( trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx ): Action => {
                let minion: Minion = HsLogic.Minion.build( trigger.owner, Violet_Apprentice );
                let position: number = 0;

                return gameCtx.actionFactory.summonMinion( {
                    source: trigger.getSource(),
                    card: minion,
                    position: position
                });
            })
        ]

    });
}