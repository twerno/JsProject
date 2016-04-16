/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    var Amani_Berserker: IMinion = classicSet.registerCard<IMinion>( {

        name: `Amani Berserker`,
        cost: 2,
        attack: 2,
        health: 3,
        minion_type: MINION_TYPE.GENERAL,
        metadata: metadata( CARD_CLASS.NEUTRAL, CARD_RARITY.COMMON ),

        triggers: [
            enrage<EnrageContext>( {
                init: (): EnrageContext => { return new EnrageContext() },

                enrage: ( trigger: Trigger, event: ActionEvent, internalCtx: EnrageContext, context: HsGameCtx ): Action => {
                    internalCtx.enchantment =
                        new HsLogic.AttackHealthEnchantment( event.param.source, <Character>trigger.parent, false )
                            .init( { attack: 3, health: 0 });

                    return DefActionHelper.AttachEnchantment( internalCtx.enchantment );
                },

                backToNormal: ( trigger: Trigger, event: ActionEvent, internalCtx: EnrageContext, context: HsGameCtx ): Action => {
                    return DefActionHelper.DetachEnchantment( internalCtx.enchantment );
                }
            })
        ],
    });
}