///<reference path="../../core/HsAction.ts"/>


"use strict";

namespace HSLogic {

    /**
     * PayCostAndRemoveFromHand
     *
 	 */
    export class PayCostAndRemoveFromHand extends jsLogic.SimpleAction<HsGameCtx> {

        baseActionResolver(_this_: PayCostAndRemoveFromHand, gameCtx: HsGameCtx): void {

            let player: Player = _this_.param.player;
            let card: Card = _this_.param.card;

            if (player.filled_mana_crystals < card.cost)
                throw new Error(`NOT enough mana to play ${card}.`);

            player.filled_mana_crystals -= card.cost;


            gameCtx.zonesOf(player).hand.removeEntity(card);
            gameCtx.zonesOf(player).graveyard.addEntity(card);
        }


        constructor(public param: PlayCardParam) {
            super(param.sourceAction);
        }
    }
}