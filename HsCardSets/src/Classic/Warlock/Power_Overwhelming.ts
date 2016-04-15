/// <reference path="../set.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    var Power_Overwhelming: ISpell = classicSet.registerCard<ISpell>( {

        name: `Power Overwhelming`,

        cost: 1,
        rarity: RARITY.COMMON,
        cardClass: CARD_CLASS.WARLOCK,


        spellTextAction: {
            targets: TARGET.SINGLE_CHARACTER,
            actionBuilder( source: ISource, targets: Character[], context: HsGameCtx ): Action[] {
                let actions: Action[] = [],
                    target: Character;

                for ( let i = 0; i < targets.length; i++ )
                    actions.push(
                        DefActionHelper.AttachEnchantment(
                            new HsLogic.AttackHealthEnchantment( source, targets[i], false )
                                .init( { attack: 4, health: 4 })
                        )
                    );

                actions.push(
                    DefActionHelper.AddTag( {
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