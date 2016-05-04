///// <reference path="../../core/action.ts" />
//"use strict";
//
//namespace HsLogic {
//
//
//    /**
//     * Sequence
//     *
// 	 */
//    export class Sequence extends jsAction.IAction<HsGameCtx> {
//
//        resolve( self: Sequence, gameCtx: HsGameCtx ): PromiseOfActions {
//            return new Promise<ActionType | ActionType[]>(
//                ( resolve, reject ): void => {
//
//                    let actions: ActionType[] = [];
//
//                    while ( self.innerActions && self.innerActions.length > 0 )
//                        actions.push( self.innerActions.shift() );
//
//                    //actions.push(gameCtx.actionFactory.auraUpdateStep(self.source));
//                    actions.push( gameCtx.actionFactory.deathCreationStep( { source: self.source }) );
//
//                    resolve( actions );
//                });
//        }
//
//        constructor( public source: ISource, public innerActions: ActionType[] ) {
//            super();
//        }
//
//    }
//}