"use strict";

namespace HsLogic {

    /**
     * Battlecry
     *
 	 */

    export class Battlecry<P extends PlayCardParam> extends Action<P> {

        resolve( self: Battlecry<P>, context: HsGameCtx ): PromiseOfActions {

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: jsLogic.IAction<HsGameCtx>[] = [];;

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