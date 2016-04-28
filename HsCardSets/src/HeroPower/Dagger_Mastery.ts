"use strict";

namespace Def {

    export var Dagger_Mastery: IHeroPower = {
        name: `Dagger Mastery`,

        cost: 2,

        ability: {
            targets: null,
            actionBuilder( source: ISource, targets: Character[], gameCtx: HsGameCtx ): Action[] {
                return [
                    gameCtx.actionFactory.equipWeapon( {
                        source: source,
                        targetPlayer: source.player,
                        weapon: HsLogic.Weapon.build( source.player, Wicked_Knife )
                    })

                ];
            }
        }
    }

}