///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>
///<reference path="../BasicSet.ts"/>

"use strict";

namespace Def {

    var Arcane_Missiles: ISpell = basicSet.registerCard<ISpell>( {
        name: `Arcane Missiles`,
        cost: 1,

        enchantments: [],
        triggers: [],

        playActions: [

            ( source: HsSource, context: GameCtx ): Action[] => {
                return [
                    //context.actionFactory.damage.randomlySplitDamage( {
                    //    source: source,
                    //    damageType: DAMAGE_TYPE.DIRECT,
                    //    partsAmount: 3,
                    //    damagePerPart: 1,
                    //    splitMode: SPLIT_MODE.MISSILE
                    //})
                ]
            }
        ],


    });
}