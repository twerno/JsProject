/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    var Abomination: IMinion = classicSet.registerCard<IMinion>( {

        name: `Abomination`,
        cost: 5,
        attack: 4,
        health: 4,

        rarity: RARITY.RARE,
        cardClass: CARD_CLASS.NEUTRAL,
        minion_type: MINION_TYPE.GENERAL,

        triggers: [
            Deathrattle( {

                action: ( trigger: Trigger, event: ActionEvent, context: HsGameCtx ): Action => {
                    let source: HsLogic.ISource = {
                        action: event.param.source.action,
                        caster: trigger.owner,
                        sourceType: HsLogic.SOURCE_TYPE.MINION,
                        sourceCard: trigger.sourceCard
                    };
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