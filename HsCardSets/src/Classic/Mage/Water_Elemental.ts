/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    export var Water_Elemental: IMinion = classicSet.registerMinion( {

        name: `Water Elemental`,
        cost: 4,
        attack: 3,
        health: 6,
        minion_type: MINION_TYPE.GENERAL,
        metadata: metadata( CARD_CLASS.MAGE, CARD_RARITY.COMMON ),

        mechanics: [
            {
                respondsTo: [HsLogic.event.Damage],

                triggerable: ( trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx ): boolean => {
                    let param: HsLogic.DamageParam = <HsLogic.DamageParam>event.param;

                    return event.param.source.entity === trigger.sourceCard
                        && param.damageState === HsLogic.DAMAGE_STATE.DEALT
                        && param.amount > 0;
                },

                actionBuilder: ( trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx ): Action | Action[] => {
                    let param: HsLogic.DamageParam = <HsLogic.DamageParam>event.param;

                    return gameCtx.actionFactory.freeze( {
                        source: trigger.getSource(),
                        targets: [param.target]
                    });
                }
            }
        ]
    });
}