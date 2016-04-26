"use strict";

namespace Def {

    export var Reinforce: IHeroPower = {
        name: `Reinforce`,

        cost: 2,

        ability: {
            targets: null,
            actionBuilder( source: ISource, targets: Character[], gameCtx: HsGameCtx ): Action[] {

                let minion: Minion = HsLogic.Minion.build( source.player, Silver_Hand_Recruit );
                let position: number = 100;

                return [
                    gameCtx.actionFactory.summonMinion( {
                        source: source,
                        card: minion,
                        position: position
                    })
                ]

            }
        }
    }

}