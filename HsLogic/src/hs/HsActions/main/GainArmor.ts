/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {

    export interface GainArmorParam extends IActionParam {
        targetPlayer: Player,
        amount: number
    }

    /**
     * GainArmor
     *
 	 */

    export class GainArmor<P extends GainArmorParam> extends Action<P> {

        resolve( self: GainArmor<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param;

                    param.targetPlayer.hero.body.armor += param.amount;

                    resolve( jsAction.NO_CONSEQUENCES );
                }
            ); // return new Promise

        } // resolve(self: GainArmor

    } // export class GainArmor

}