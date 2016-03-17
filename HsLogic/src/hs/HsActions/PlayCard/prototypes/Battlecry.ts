"use strict";

namespace HsLogic {

    /**
     * Battlecry
     *
 	 */

    export class Battlecry<P extends PlayCardParam> extends HsAction<P> {

        resolve( _this_: Battlecry<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = _this_.param,
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

        } // resolve(_this_: Battlecry

    } // export class Battlecry

}