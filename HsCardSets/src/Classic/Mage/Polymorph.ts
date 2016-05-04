/// <reference path="../set.ts" />
/// <reference path="sheep_token.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    export var Polymorph: ISpell = classicSet.registerSpell( {

        name: `Polymorph`,
        cost: 2,
        metadata: metadata( CARD_CLASS.MAGE, CARD_RARITY.COMMON ),
        linked: [Sheep_Token],


        spellTextAction: {
            targets: SINGLE_REQUIRED_TARGET( TargetFinder.ANY_SPELL_TARGETABLE_MINION ),

            actionBuilder( source: ISource, targets: Minion[], gameCtx: HsGameCtx ): Action[] {
                let sheep: Minion = new HsLogic.Minion( targets[0].owner, Sheep_Token );


                return [
                    gameCtx.actionFactory.transformMinion( {
                        source: source,
                        target: targets[0],
                        transformInto: sheep
                    })
                ];

            }
        } // spellTextAction


    });
}