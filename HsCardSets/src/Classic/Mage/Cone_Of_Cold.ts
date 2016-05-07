/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    export var Cone_Of_Cold: ISpell = classicSet.registerSpell( {

        name: `Cone Of Cold`,
        cost: 4,
        metadata: metadata( CARD_CLASS.MAGE, CARD_RARITY.COMMON ),


        spellTextAction: {
            targets: SINGLE_REQUIRED_TARGET( TargetFinder.ENEMY_SPELL_TARGETABLE_MINION ),

            executable( source: ISource, targets: Character[], gameCtx: HsGameCtx ): boolean {
                if ( !targets || targets.length === 0 )
                    throw new Error( `No targets!` );

                let target: Minion = targets[0];
                return gameCtx.gameBoard.zonesOf( target.owner ).battlefield.contains( target );
            },

            actionBuilder( source: ISource, targets: Character[], gameCtx: HsGameCtx ): Action[] {

                let mainTarget: Minion = targets[0],

                    adjacents: Minion[] = TargetFinder.ENEMY_MINION
                        .addFilter( Filter.adjacentMinions( mainTarget ) )
                        .buildSet( source, gameCtx ),

                    allTargets: Minion[] = [mainTarget].concat( adjacents );

                return [
                    gameCtx.actionFactory.freeze( {
                        source: source,
                        targets: allTargets
                    }),
                    gameCtx.actionFactory.calculateAndDealDamage( {
                        source: source,
                        damageType: DAMAGE_TYPE.DIRECT,
                        amount: 1,
                        targets: allTargets
                    })
                ];
            }
        } // spellTextAction
    });
}