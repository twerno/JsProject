/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {

    /**
     * Battlecry
     *
 	 */

    export class Battlecry<P extends PlayCardParam> extends Action<P> {

        resolve( self: Battlecry<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        card: Minion | Weapon = <Minion | Weapon>param.card,
                        actions: ActionType[] = [];

                    //@TODO Fix for Brann Bronzebeard 

                    if ( card.battlecry )
                        actions.push.apply( actions,
                            card.battlecry.actionBuilder( param.card.getSource(), param.targets, gameCtx ) );

                    resolve( actions );
                }
            ); // return new Promise

        } // resolve(self: Battlecry

    } // export class Battlecry

}