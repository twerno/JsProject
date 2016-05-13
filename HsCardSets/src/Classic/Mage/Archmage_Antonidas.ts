/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    export var Archmage_Antonidas: IMinion = classicSet.registerMinion( {

        name: `Archmage Antonidas`,
        cost: 7,
        attack: 5,
        health: 7,
        minion_type: MINION_TYPE.GENERAL,
        metadata: metadata( CARD_CLASS.MAGE, CARD_RARITY.LEGENDARY ),

        mechanics: [
            Whenever_You_Cast_Spell(( trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx ): Action[] => {
                let fireball: Spell = HsLogic.Spell.build( trigger.owner, Fireball );

                return [
                    gameCtx.actionFactory.putCardIntoOwnersHand( {
                        source: trigger.getSource(),
                        card: fireball
                    })
                ];
            })
        ] // mechanics
    });
}