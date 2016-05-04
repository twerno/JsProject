/// <reference path="../set.ts" />
/// <reference path="mirror_image_token.ts" />
///<reference path="../../../../HsLogic/dist/HsLogic.d.ts"/>

"use strict";

namespace Def {

    export var Mirror_Image: ISpell = classicSet.registerSpell( {

        name: `Mirror Image`,
        cost: 1,
        metadata: metadata( CARD_CLASS.MAGE, CARD_RARITY.COMMON ),
        linked: [
            Mirror_Image_Token
        ],


        spellTextAction: {
            targets: null,

            actionBuilder( source: ISource, targets: Character[], gameCtx: HsGameCtx ): Action[] {
                let image1: Minion = new HsLogic.Minion( source.player, Mirror_Image_Token ).init();
                let image2: Minion = new HsLogic.Minion( source.player, Mirror_Image_Token ).init();


                return [
                    gameCtx.actionFactory.summonMinion( {
                        source: source,
                        card: image1,
                        position: 100
                    }),
                    gameCtx.actionFactory.summonMinion( {
                        source: source,
                        card: image2,
                        position: 100
                    })
                ];

            }
        } // spellTextAction


    });
}