"use strict";

namespace Def {

    export var Lesser_Heal: IHeroPower = {
        name: `Lesser Heal`,

        cost: 2,

        ability: {
            targets: SINGLE_REQUIRED_TARGET( TargetFinder.ANY_SPELL_TARGETABLE_CHARACTER ),

            actionBuilder( source: ISource, targets: Character[], gameCtx: HsGameCtx ): Action[] {
                return [
                    gameCtx.actionFactory.calculateAndHeal( {
                        source: source,
                        amount: 2,
                        targets: targets,
                        cancelAction: { value: false }
                    })
                ];
            }
        }

    }
}