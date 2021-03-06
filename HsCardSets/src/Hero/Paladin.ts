/// <reference path="../heropower/reinforce.ts" />
/// <reference path="../heropower/tokens/silver_hand_recruit.ts" />
"use strict";

namespace Def {

    export var Paladin: IHero = {
        name: `Paladin`,

        cost: 0,
        armor: 0,
        attack: 0,
        health: 30,
        minion_type: MINION_TYPE.GENERAL,
        metadata: metadata( CARD_CLASS.PALADIN, CARD_RARITY.LEGENDARY ),
        linked: [Reinforce, Silver_Hand_Recruit],

        equipHeroActions: {
            targets: null,
            actionBuilder( source: ISource, targets: Character[], gameCtx: HsGameCtx ): Action[] {

                let heroPower: HsLogic.HeroPower = HsLogic.HeroPower.build( source.player, Reinforce );

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