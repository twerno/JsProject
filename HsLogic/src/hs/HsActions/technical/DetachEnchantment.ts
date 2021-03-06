/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {


    export interface DetachEnchantmentParam extends IActionParam {
        enchantment: Enchantment<PermanentExt>
    }


    export class DetachEnchantment<P extends DetachEnchantmentParam> extends Action<P> {

        resolve( self: DetachEnchantment<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param;

                    Collection.removeFrom( param.enchantment.target.enchantments, param.enchantment );
                    param.enchantment.remove();

                    resolve( jsAction.NO_CONSEQUENCES );
                }
            );
        }
    }

}