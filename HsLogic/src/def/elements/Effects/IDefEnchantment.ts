/// <reference path="../idefentities.ts" />

"use strict";

namespace Def {

    export interface IEnchantmentEffect {
        tags?: Tag[],
        auras?: Aura[],
        triggers?: Trigger[],
        enchantments?: Enchantment[]
    }


    export type FEnchantmentEffectBuilder = ( enchantment: Enchantment, gameCtx: HsGameCtx ) => IEnchantmentEffect;

    export interface IDefEnchantment {

        name: string,

        desc: string,

        mechanic?: string,

        priority?: number

        enchantmentMode: ENCHANTMENT_MODE,

        effectBuilder: FEnchantmentEffectBuilder
    }


    export function isDefEnchantment( x: any ): x is IDefEnchantment {
        return ClassUtils.ObjectValidator
            .STRING( 'name' )
            .STRING( 'desc' )
            .STRING( 'mechanic' ).OPTIONAL
            .NUMBER( 'priority' ).OPTIONAL
            .STRING( 'name' )
            .STRING( 'enchantmentMode' )
            .FUNCTION( 'effectBuilder' )
            .validate( x );
    }
}