"use strict";

namespace HsLogic {

    /**
     * Battlecry
     *
 	 */

    export class Battlecry<P extends PlayCardParam> extends Action<P> {

        resolve( self: Battlecry<P>, context: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [];;

                    //@TODO Fix for Brann Bronzebeard 

                    actions.push( new ExecuteTriggers( {
                        source: param.source,
                        defActions: param.card.playActions,
                        targets: param.acquiredTargets
                    }) );

                    resolve( actions );
                }
            ); // return new Promise

        } // resolve(self: Battlecry

    } // export class Battlecry

}