"use strict";

namespace Def {

    export var Steady_Shot: IHeroPower = {
        name: `Steady Shot`,

        cost: 2,

        isActivable: ( source: ISource, gameCtx: HsGameCtx ): boolean => {
            return TargetFinder.ENEMY_HERO.addFilter( Filter.targetable_by_spell_or_hero_power )
                .buildSet( source, gameCtx ).length > 0;
        },

        ability: {
            targets: null,
            actionBuilder( source: ISource, targets: Character[], gameCtx: HsGameCtx ): Action[] {
                let enemyHero: Character[] = TargetFinder.ENEMY_HERO.buildSet( source, gameCtx );

                return [
                    gameCtx.actionFactory.calculateAndDealDamage( {
                        source: source,
                        damageType: DAMAGE_TYPE.DIRECT,
                        amount: 2,
                        targets: enemyHero
                    })
                ];
            }
        }
    }

}