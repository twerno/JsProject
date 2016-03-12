///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>
///<reference path="../BasicSet.ts"/>

"use strict";

namespace HSLogic {

    var Arcane_Missiles: ISpell = {
        name: `Arcane Missiles`,
        cost: 1,

        card_type: CARD_TYPE.SPELL,

        spellActions: [
            {
                actionBuilder: ( source: IHsSource, gameCtx: HsGameCtx ): jsLogic.IAction<HsGameCtx> => {
                    return gameCtx.actionFactory.damage.randomlySplitDamage( {
                        source: source,
                        damageType: DAMAGE_TYPE.DIRECT,
                        sourceType: SOURCE_TYPE.SPELL,
                        partsAmount: 3,
                        damagePerPart: 1,
                        splitMode: SPLIT_MODE.MISSILE
                    });
                }

            }
        ]
    }

    basicSet.registerCard( Arcane_Missiles );
}