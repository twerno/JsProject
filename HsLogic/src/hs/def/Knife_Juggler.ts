

"use strict";

namespace Def {

    var Knife_Juggler: IMinion = {
        name: `Knife Juggler`,
        cost: 2,

        attack: 3,
        hp: 2,
        minion_type: MINION_TYPE.GENERAL,

        //enchantments: [],
        triggers: [{
            eventClass: HsLogic.event.AfterSummon,
            triggerPriority: Trigger_Priority_DEFAULT,
            actions: ( self: IDefTriggerImpl, event: HsLogic.event.AfterSummon, context: GameCtx ): Action[] => {
                let character: HsLogic.Character[] = SetBuilderHelper.ENEMY_CHARACTER.buildSet<HsLogic.Character>( event.param.source, context );
                // wybierz jednego - losowo
                // deal 1 dmg
                return null;
            }
        }],
        flags: {},
        playActions: [],


    }
}