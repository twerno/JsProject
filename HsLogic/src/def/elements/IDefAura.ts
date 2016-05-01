"use strict";

namespace Def {

    export interface IAuraManagedEffects {
        target: PermanentExt,
        tags: Tag[],
        triggers: Trigger[]
        enchantments: Enchantment[]
    }

    export type FAuraEffectBuilder = ( self: Aura, target: PermanentExt, gameCtx: HsGameCtx ) => IAuraManagedEffects;

    export interface IDefAura {

        priority?: number

        auraType: AURA_TYPE,

        targetBuilder: ( self: Aura, gameCtx: HsGameCtx ) => ISetBuilder<PermanentExt>,

        effectBuilder: FAuraEffectBuilder
    }

    export function isDefAura( x: any ): x is IDefAura {
        return ClassUtils.ObjectValidator
            .addType( 'priority', 'number', false )
            .addType( 'auraType', 'string' )
            .addType( 'targetBuilder', 'function' )
            .addType( 'effectBuilder', 'function' )
            .validate( x );
    }
}