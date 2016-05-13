/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    export var Ice_Barrier: ISecret = classicSet.registerSecred( {

        name: `Ice Barrier`,
        cost: 3,
        metadata: metadata( CARD_CLASS.MAGE, CARD_RARITY.COMMON ),


        mechanics: [
            SecretsTrigger( {

                respondsTo: [HsLogic.event.AttackEvent],

                triggerable: ( trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx ): boolean => {
                    return event instanceof HsLogic.event.AttackEvent
                        && event.param.defender === trigger.owner.hero;
                },

                actionBuilder( trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx ): Action[] {
                    return [
                        gameCtx.actionFactory.gainArmor( {
                            source: trigger.getSource(),
                            amount: 8,
                            targetPlayer: trigger.owner
                        })
                    ];
                }
            }) // SecretsTrigger
        ]


    });
}