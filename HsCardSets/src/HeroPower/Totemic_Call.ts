"use strict";

namespace Def {

    export var Totemic_Call: IHeroPower = {
        name: `Totemic Call`,

        cost: 2,

        isActivable: ( source: ISource, gameCtx: HsGameCtx ): boolean => {
            return availableTotems( source, gameCtx ).length > 0
                && TargetFinder.FRIENDLY_MINION.buildSet( source, gameCtx ).length < gameCtx.consts.battlefield_limit;
        },

        ability: {
            targets: null,

            actionBuilder( source: ISource, targets: Character[], gameCtx: HsGameCtx ): Action[] {

                let resultSet: IMinion[] = [];

                return [
                    gameCtx.techActionFactory.chooseAtRandom( {
                        source: source,
                        sourceSet: availableTotems( source, gameCtx ),
                        resultSet: resultSet,
                        options: { amount: 1 }
                    }),
                    gameCtx.techActionFactory.inlineAction(( resolve, reject ) => {
                        if ( resultSet.length === 1 ) {
                            let minion: Minion = HsLogic.Minion.build( source.player, resultSet[0] );
                            let position: number = 100;

                            resolve( gameCtx.actionFactory.summonMinion( {
                                source: source, card: minion, position: position
                            }) )
                        }
                        else
                            resolve( jsAction.NO_CONSEQUENCES );
                    })
                ];
            }
        }
    }


    function availableTotems( source: ISource, gameCtx: HsGameCtx ): IMinion[] {
        return new Def.DefMinionSetBuilder(
            [Healing_Totem, Searing_Totem, Stoneclaw_Totem, Wrath_Of_Air_Totem]
        )
            .addFilter( Filter.DoesNotControllMinion() )
            .buildSet( source, gameCtx );
    }

}