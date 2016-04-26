"use strict";

namespace Def {

    export var Life_Tap: IHeroPower = {
        name: `Life Tap`,

        cost: 2,

        ability: {
            targets: null,
            actionBuilder( source: ISource, targets: Character[], gameCtx: HsGameCtx ): Action[] {
                return [
                    gameCtx.actionFactory.calculateAndDealDamage( {
                        source: source,
                        damageType: DAMAGE_TYPE.PAY_LIFE,
                        amount: 2,
                        targets: [source.player.hero]
                    }),
                    gameCtx.actionFactory.drawCard( {
                        source: source,
                        targetPlayer: source.player
                    })
                ];
            }
        }
    }

}