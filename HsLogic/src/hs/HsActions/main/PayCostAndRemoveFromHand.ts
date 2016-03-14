///<reference path="../../core/HsAction.ts"/>


"use strict";

namespace HSLogic {

    /**
     * PayCostAndRemoveFromHand
     *
 	 */
    export class PayCostAndRemoveFromHand<P extends PlayCardParam> extends HsAction<P> {

        resolve( _this_: PayCostAndRemoveFromHand<P>, gameCtx: HsGameCtx ): PromiseOfActions {
            if ( _this_.param.cancelAction.value )
                return Promise.resolve( [] );

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = _this_.param,
                        player: Player = param.source.caster,
                        card: Card = param.card;

                    if ( player.filled_mana_crystals < card.cost )
                        throw new Error( `NOT enough mana to play ${card}.` );

                    player.filled_mana_crystals -= card.cost;


                    gameCtx.zonesOf( player ).hand.removeEntity( card );
                    gameCtx.zonesOf( player ).graveyard.addEntity( card );

                    resolve( jsLogic.NO_CONSEQUENCES );
                });
        }
    }
}