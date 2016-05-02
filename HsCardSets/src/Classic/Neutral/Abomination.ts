/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    export var Abomination: IMinion = classicSet.registerMinion( {

        name: `Abomination`,
        cost: 5,
        attack: 4,
        health: 4,
        minion_type: MINION_TYPE.GENERAL,
        metadata: metadata( CARD_CLASS.NEUTRAL, CARD_RARITY.RARE ),

        mechanics: [
            Deathrattle( {

                action: ( trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx ): Action => {
                    let source: ISource = trigger.sourceCard.getSource();

                    return gameCtx.actionFactory.calculateAndDealDamage( {
                        source: source,
                        targets: TargetFinder.ANY_CHARACTER.buildSet( source, gameCtx ),
                        amount: 4,
                        damageType: DAMAGE_TYPE.DIRECT
                    });
                }

            })
        ]
    });
}