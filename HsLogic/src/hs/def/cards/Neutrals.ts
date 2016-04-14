"use strict";

namespace Def {

    var Shattered_Sun_Cleric: IMinion = {
        name: `Shattered Sun Cleric`,
        cost: 2,
        rarity: RARITY.COMMON,
        cardClass: CARD_CLASS.NEUTRAL,

        attack: 3,
        health: 2,
        minion_type: MINION_TYPE.GENERAL,

        triggers: [],
        battlecry: null,
        tags: []
    };


    var Amani_Berserker: IMinion = {
        name: `Amani Berserker`,
        cost: 2,
        rarity: RARITY.COMMON,
        cardClass: CARD_CLASS.NEUTRAL,

        attack: 2,
        health: 3,
        minion_type: MINION_TYPE.GENERAL,

        triggers: [
            enrage(
                (): EnrageContext => { return new EnrageContext() },

                ( trigger: Trigger, event: ActionEvent, context: HsGameCtx ): Action[] => {
                    let internalCtx: EnrageContext = <EnrageContext>trigger.internalCtx;
                    internalCtx.enchantment =
                        new HsLogic.AttackHealthEnchantment( event.param.source, <Character>trigger.parent, false )
                            .init( { attack: 3, health: 0 });

                    return [DefActionHelper.AttachEnchantment( internalCtx.enchantment )];
                },

                ( trigger: Trigger, event: ActionEvent, context: HsGameCtx ): Action[] => {
                    let internalCtx: EnrageContext = <EnrageContext>trigger.internalCtx;

                    return [DefActionHelper.DetachEnchantment( internalCtx.enchantment )];
                })
        ],
        battlecry: null,
        tags: []
    };


}