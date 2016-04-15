/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {

    /**
     * PayCostAndRemoveFromHand
     *
 	 */
    export class PayCostAndRemoveFromHand<P extends PlayCardParam> extends Action<P> {

        resolve( self: PayCostAndRemoveFromHand<P>, context: HsGameCtx ): PromiseOfActions {
            if ( self.param.cancelAction.value )
                return Promise.resolve( [] );

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        player: Player = param.source.caster,
                        card: Card = param.card;

                    if ( player.filled_mana_crystals < card.baseCost )
                        throw new Error( `NOT enough mana to play ${card}.` );

                    player.filled_mana_crystals -= card.baseCost;

                    context.zonesOf( player ).hand.removeEntity( card );

                    resolve( jsLogic.NO_CONSEQUENCES );
                }
            ); // return new Promise

        } // resolve( self: PayCostAndRemoveFromHand<P>

    } // export class PayCostAndRemoveFromHand
}