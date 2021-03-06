"use strict";

namespace Def {

    export var Fireblast: IHeroPower = {
        name: `Fireblast`,

        cost: 2,

        isActivable: ( source: ISource, gameCtx: HsGameCtx ): boolean => {
            return TargetFinder.ANY_SPELL_TARGETABLE_CHARACTER.buildSet( source, gameCtx ).length > 0;
        },

        ability: {
            targets: SINGLE_REQUIRED_TARGET( TargetFinder.ANY_SPELL_TARGETABLE_CHARACTER ),

            actionBuilder( source: ISource, targets: Character[], gameCtx: HsGameCtx ): Action[] {
                return [
                    gameCtx.actionFactory.calculateAndDealDamage( {
                        source: source,
                        damageType: DAMAGE_TYPE.DIRECT,
                        amount: 1,
                        targets: targets
                    })
                ];
            }
        }
    }

}