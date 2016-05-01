/// <reference path="../heropower/lesser_heal.ts" />
"use strict";

namespace Def {

    export var Priest: IHero = {
        name: `Priest`,

        cost: 0,
        armor: 0,
        attack: 0,
        health: 30,
        minion_type: MINION_TYPE.GENERAL,
        metadata: metadata( CARD_CLASS.PRIEST, CARD_RARITY.LEGENDARY ),
        linked: [Lesser_Heal],

        equipHeroActions: {
            targets: null,
            actionBuilder( source: ISource, targets: Character[], gameCtx: HsGameCtx ): Action[] {

                let heroPower: HsLogic.HeroPower = HsLogic.HeroPower.build( source.player, Lesser_Heal );

                return [
                    gameCtx.actionFactory.equipHeroPower( {
                        source: source,
                        targetPlayer: source.player,
                        heroPower: heroPower
                    })
                ];
            }
        }
    }

}