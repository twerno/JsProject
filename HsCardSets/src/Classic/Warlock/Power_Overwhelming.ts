/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    export var Power_Overwhelming: ISpell = classicSet.registerSpell( {

        name: `Power Overwhelming`,
        cost: 1,
        metadata: metadata( CARD_CLASS.WARLOCK, CARD_RARITY.COMMON ),


        spellTextAction: {
            targets: SINGLE_REQUIRED_TARGET( TargetFinder.FRIENDLY_SPELL_TARGETABLE_MINION ),

            actionBuilder( source: ISource, targets: Character[], gameCtx: HsGameCtx ): Action[] {
                let actions: Action[] = [];

                for ( let target of targets )
                    actions.push(
                        gameCtx.techActionFactory.attachEnchantment( {
                            source: source,
                            enchantment: new HsLogic.AttackHealthEnchantment( source, target, false )
                                .init( { attack: 4, health: 4 })
                        })
                    );

                actions.push(
                    gameCtx.techActionFactory.addTag( {
                        source: source,
                        targets: targets,
                        tag: new Destroy_At_The_End_of_Turn_Tag( source )
                    })
                );

                return actions;
            }
        }
    });
}