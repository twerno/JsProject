/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    var Animated_Armor: IMinion = leagueSet.registerMinion( {

        name: `Animated Armor`,
        cost: 4,
        attack: 4,
        health: 4,
        minion_type: MINION_TYPE.GENERAL,
        metadata: metadata( CARD_CLASS.MAGE, CARD_RARITY.RARE ),

        triggers: [
            {
                respondsTo: HsLogic.event.PreDamagePhase,

                triggerable: ( trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx ): boolean => {
                    return trigger.owner.hero === ( <HsLogic.DamageParam>event.param ).target;
                },

                actionBuilder: ( trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx ): Action[] => {
                    ( <HsLogic.DamageParam>event.param ).amount = 1;
                    return null;
                }
            }
        ]
    });
}