"use strict";

namespace Def {

    export var Armor_Up: IHeroPower = {
        name: `Armor Up!`,

        cost: 2,

        ability: {
            targets: null,
            actionBuilder( source: ISource, targets: Character[], gameCtx: HsGameCtx ): Action[] {
                return [
                    gameCtx.actionFactory.gainArmor( {
                        source: source,
                        targetPlayer: source.player,
                        amount: 2
                    })
                ];
            }
        }
    }

}