/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {

    export interface RemoveSecretParam extends IActionParam {
        secret: Secret
    }

    /**
     * GainArmor
     *
 	 */

    export class RemoveSecret<P extends RemoveSecretParam> extends Action<P> {

        resolve( self: RemoveSecret<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param;

                    gameCtx.gameBoard.zonesOf( param.secret.owner ).secret.remove( param.secret );

                    resolve( jsAction.NO_CONSEQUENCES );
                }
            ); // return new Promise

        } // resolve(self: RemoveSecret

    } // export class RemoveSecret

}