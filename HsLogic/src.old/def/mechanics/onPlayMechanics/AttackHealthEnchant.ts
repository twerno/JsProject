/// <reference path="../enchantment.ts" />
"use strict";

namespace Def {

    export interface AttackHealthEnchantParam {
        targets: IDefTargetDefinition<Object>,
        values: HsLogic.AttackHealthEnchantmentParam,
        expireMode: EXPIRE_MODE,
        isAura?: boolean
    }


    export function AttackHealthEnchantment( param: AttackHealthEnchantParam ): IDefAction {
        return {
            targets: param.targets,

            actionBuilder: Enchantment( {
                expireMode: param.expireMode,

                enchantmentBuilder: ( source: ISource, target: Permanent, gameCtx: HsGameCtx ): Enchantment => {
                    if ( target instanceof HsLogic.Weapon )
                        throw new Error( `Weapon is not a valid target for AttackHealthEnchantment!` );

                    return new HsLogic.AttackHealthEnchantment( source, <Character>target, param.isAura || false )
                        .init( param.values )
                }

            })
        }
    }
}