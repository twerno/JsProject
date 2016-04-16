/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    var Swipe: ISpell = classicSet.registerCard<ISpell>( {

        name: `Swipe`,
        cost: 2,
        metadata: metadata( CARD_CLASS.DRUID, CARD_RARITY.COMMON ),

        spellTextAction: {

            targets: SINGLE_REQUIRED_TARGET( TargetFinder.EMEMY_SPELL_TARGETABLE_CHARACTER ),

            actionBuilder( source: ISource, targets: Character[], context: HsGameCtx ): Action[] {
                let otherTargets: Character[] = TargetFinder.EMEMY_CHARACTER
                    .addFilter( Filter.OtherThan( targets ) )
                    .buildSet( source, context );

                return [
                    new HsLogic.MultistepDamage( {
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
                        notifyEventMode: HsLogic.NOTIFY_MODE.AFTER_ALL_STEPS,
                    })
                ];
            }
        } //spellTextAction

    });
}