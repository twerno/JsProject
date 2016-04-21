/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    var Power_Overwhelming: ISpell = classicSet.registerSpell( {

        name: `Power Overwhelming`,
        cost: 1,
        metadata: metadata( CARD_CLASS.WARLOCK, CARD_RARITY.COMMON ),


        spellTextAction: {
            targets: SINGLE_REQUIRED_TARGET( TargetFinder.FRIENDLY_SPELL_TARGETABLE_MINION ),

            actionBuilder( source: ISource, targets: Character[], gameCtx: HsGameCtx ): Action[] {
                let actions: Action[] = [];

                for ( let target of targets )
                    actions.push(
                        DefActionHelper.AttachEnchantment(
                            new HsLogic.AttackHealthEnchantment( source, target, false )
                                .init( { attack: 4, health: 4 })
                        )
                    );

                actions.push(
                    DefActionHelper.BuildAddTag( {
                        source: source,
                        targets: targets,
                        tag: Destroy_At_The_End_of_Turn_Tag
                    })
                );

                return actions;
            }
        }
    });
}