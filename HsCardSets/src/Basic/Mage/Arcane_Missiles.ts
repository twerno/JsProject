///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>
///<reference path="../BasicSet.ts"/>

"use strict";

namespace HSLogic {

    var Arcane_Missiles: ISpell = basicSet.registerCard<ISpell>( {
        name: `Arcane Missiles`,
        cost: 1,

        cardType: CARD_TYPE.SPELL,
        enchantments: [],

        spellActions: [

            ( source: IHsSource, gameCtx: HsGameCtx ): jsLogic.IAction<HsGameCtx>[] => {
                return [
                    gameCtx.actionFactory.damage.randomlySplitDamage( {
                        source: source,
                        damageType: DAMAGE_TYPE.DIRECT,
                        partsAmount: 3,
                        damagePerPart: 1,
                        splitMode: SPLIT_MODE.MISSILE
                    })
                ]
            }


        ],

        triggers: {}
    });
}