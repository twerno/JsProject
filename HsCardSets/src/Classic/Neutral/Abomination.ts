/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    var Abomination: IMinion = classicSet.registerCard<IMinion>( {

        name: `Abomination`,
        cost: 5,
        attack: 4,
        health: 4,
        minion_type: MINION_TYPE.GENERAL,
        metadata: metadata( CARD_CLASS.NEUTRAL, CARD_RARITY.RARE ),

        triggers: [
            Deathrattle( {

                action: ( trigger: Trigger, event: ActionEvent, context: HsGameCtx ): Action => {
                    let source: ISource = trigger.sourceCard.getSource();

                    return new HsLogic.CalculateAndDealDamage( {
                        source: source,
                        targets: TargetFinder.ANY_CHARACTER.buildSet( source, context ),
                        amount: 4,
                        damageType: DAMAGE_TYPE.DIRECT
                    });
                }

            })
        ]
    });
}