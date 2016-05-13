/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    export var Counterspell: ISecret = classicSet.registerSecred( {

        name: `Counterspell`,
        cost: 3,
        metadata: metadata( CARD_CLASS.MAGE, CARD_RARITY.RARE ),


        mechanics: [
            SecretsTrigger( {

                respondsTo: [HsLogic.OnPlayPhaseEvent],

                triggerable: ( trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx ): boolean => {
                    return event instanceof HsLogic.OnPlayPhaseEvent
                        && event.param.card instanceof HsLogic.Spell
                        && event.param.card.owner !== trigger.owner;
                },

                actionBuilder( trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx ): Action[] {
                    return [
                        gameCtx.techActionFactory.cancelAction(( <HsLogic.OnPlayPhaseEvent>event ).param )
                    ];
                }
            }) // SecretsTrigger
        ] // mechanics


    });
}