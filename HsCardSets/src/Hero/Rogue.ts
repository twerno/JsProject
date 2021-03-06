/// <reference path="../heropower/dagger_mastery.ts" />
/// <reference path="../heropower/tokens/wicked_knife.ts" />
"use strict";

namespace Def {

    export var Rogue: IHero = {
        name: `Rogue`,

        cost: 0,
        armor: 0,
        attack: 0,
        health: 30,
        minion_type: MINION_TYPE.GENERAL,
        metadata: metadata( CARD_CLASS.ROGUE, CARD_RARITY.LEGENDARY ),
        linked: [Dagger_Mastery, Wicked_Knife],

        equipHeroActions: {
            targets: null,
            actionBuilder( source: ISource, targets: Character[], gameCtx: HsGameCtx ): Action[] {

                let heroPower: HsLogic.HeroPower = HsLogic.HeroPower.build( source.player, Dagger_Mastery );

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