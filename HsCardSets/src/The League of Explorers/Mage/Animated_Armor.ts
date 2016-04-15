/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    var Animated_Armor: IMinion = leagueSet.registerCard<IMinion>( {
        name: `Animated Armor`,
        cost: 4,
        rarity: RARITY.RARE,
        cardClass: CARD_CLASS.MAGE,

        attack: 4,
        health: 4,
        minion_type: MINION_TYPE.GENERAL,

        triggers: [{
            respondsTo: HsLogic.event.PreDamagePhase,
            triggerable: ( trigger: Trigger, event: ActionEvent, context: HsGameCtx ): boolean => {
                return trigger.parent.owner === ( <HsLogic.DamageParam>event.param ).target;
            },
            actionBuilder: ( trigger: Trigger, event: ActionEvent, context: HsGameCtx ): Action => {
                ( <HsLogic.DamageParam>event.param ).amount = 1;
                return null;
            }
        }],
        battlecry: null,
        tags: []
    });
}