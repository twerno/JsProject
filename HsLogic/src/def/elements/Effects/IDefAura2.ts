"use strict";

namespace Def {


    export interface IDefAura2 extends INamedEntity {

        priority?: number

        auraType: AURA_TYPE,

        targetBuilder: ( aura: Aura, gameCtx: HsGameCtx ) => ISetBuilder<PermanentExt>,

        effectBuilder: ( aura: Aura, target: PermanentExt, gameCtx: HsGameCtx ) => Enchantment[]
    }


    export function isDefAura2( x: any ): x is IDefAura {
        return ClassUtils.ObjectValidator
            .NUMBER( 'priority' ).OPTIONAL
            .STRING( 'auraType' )
            .FUNCTION( 'targetBuilder' )
            .FUNCTION( 'effectBuilder' )
            .validate( x );
    }
}