"use strict";

namespace Def {

    export var Steady_Shot: IHeroPower = {
        name: `Steady Shot`,

        cost: 2,

        ability: {
            targets: null,
            actionBuilder( source: ISource, targets: Character[], gameCtx: HsGameCtx ): Action[] {
                return [
                    gameCtx.actionFactory.calculateAndDealDamage( {
                        source: source,
                        damageType: DAMAGE_TYPE.DIRECT,
                        amount: 2,
                        targets: [gameCtx.inactivePlayer.hero]
                    })
                ];
            }
        }
    }

}