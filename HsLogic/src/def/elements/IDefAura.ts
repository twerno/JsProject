"use strict";

namespace Def {

    export interface IDefAura {

        auraType: AURA_TYPE,

        targets: ( self: Aura, gameCtx: HsGameCtx ) => ISetBuilder<PermanentExt>,

        effectBuilder: ( self: Aura, target: PermanentExt, gameCtx: HsGameCtx ) => ( Enchantment | Tag )[]
    }
}