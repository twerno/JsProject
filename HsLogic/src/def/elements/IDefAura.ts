"use strict";

namespace Def {

    export interface IEffects {
        target?: PermanentExt,
        tags?: Tag[],
        triggers?: Trigger[]
        enchantments?: Enchantment[]
    }

    export type FAuraEffectBuilder = ( aura: Aura, target: PermanentExt, gameCtx: HsGameCtx ) => IEffects;

    export interface IDefAura {

        priority?: number

        auraType: AURA_TYPE,

        targetBuilder: ( aura: Aura ) => ISetBuilder<PermanentExt>,

        effectBuilder: FAuraEffectBuilder
    }

    export function isDefAura( x: any ): x is IDefAura {
        return ClassUtils.ObjectValidator
            .NUMBER( 'priority' ).OPTIONAL
            .STRING( 'auraType' )
            .FUNCTION( 'targetBuilder' )
            .FUNCTION( 'effectBuilder' )
            .validate( x );
    }
}