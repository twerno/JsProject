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

        auraType: AURA_TYPE,

        targetBuilder: ( self: Aura, gameCtx: HsGameCtx ) => ISetBuilder<PermanentExt>,

        effectBuilder: FAuraEffectBuilder
    }
}