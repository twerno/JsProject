///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    export var Healing_Totem: IMinion = ( {

        name: `Healing Totem`,
        cost: 1,
        attack: 0,
        health: 2,
        minion_type: MINION_TYPE.GENERAL,
        metadata: metadata( CARD_CLASS.SHAMAN, CARD_RARITY.COMMON, false ),

        mechanics: [
            {
                mechanic: MECHANIC.NONE,

                respondsTo: [HsLogic.event.EndOfTurn],

                enable_self_trigger_protection: false,

                actionBuilder: ( trigger: Trigger, event: ActionEvent, gameCtx: HsGameCtx ): Action | Action[] => {
                    let source: ISource = trigger.getSource();

                    return gameCtx.actionFactory.calculateAndHeal( {
                        source: source,
                        targets: TargetFinder.FRIENDLY_MINION.buildSet( source, gameCtx ),
                        amount: 1,
                        cancelAction: { value: false }
                    });
                }
            }
        ]
    });
}