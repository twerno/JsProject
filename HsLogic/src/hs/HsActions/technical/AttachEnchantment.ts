/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {


    export interface AttachEnchantmentParam extends IActionParam {
        enchantment: Enchantment<Permanent>
    }


    export class AttachEnchantment<P extends AttachEnchantmentParam> extends Action<P> {

        resolve(self: AttachEnchantment<P>, gameCtx: HsGameCtx): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                (resolve, reject): void => {
                    let param: P = self.param;

                    param.enchantment.target.enchantments.push(param.enchantment);

                    resolve(jsAction.NO_CONSEQUENCES);
                }
                );
        }
    }

}