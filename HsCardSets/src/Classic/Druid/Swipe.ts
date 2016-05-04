/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    export var Swipe: ISpell = classicSet.registerSpell( {

        name: `Swipe`,
        cost: 2,
        metadata: metadata( CARD_CLASS.DRUID, CARD_RARITY.COMMON ),

        spellTextAction: {

            targets: SINGLE_REQUIRED_TARGET( TargetFinder.ENEMY_SPELL_TARGETABLE_CHARACTER ),

            actionBuilder( source: ISource, targets: Character[], gameCtx: HsGameCtx ): Action[] {
                let otherTargets: Character[] = TargetFinder.ENEMY_CHARACTER
                    .addFilter( Filter.OtherThan( targets ) )
                    .buildSet( source, gameCtx );

                return [
                    gameCtx.actionFactory.multistepDamage( {
                        source: source,
                        steps: [
                            {
                                source: source,
                                targets: targets,
                                amount: 4,
                                damageType: DAMAGE_TYPE.DIRECT
                            },
                            {
                                source: source,
                                targets: otherTargets,
                                amount: 1,
                                damageType: DAMAGE_TYPE.DIRECT
                            }
                        ],
                        notifyMode: HsLogic.NOTIFY_MODE.AFTER_ALL_ACTIONS,
                    })
                ];
            }
        } //spellTextAction

    });
}