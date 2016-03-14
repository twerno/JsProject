"use strict";

namespace Def {

    export interface IEnchantment extends IHsEntity {
        recalculate( enchantedEntity: IHsEntity, gameCtx: GameCtx ): void;
    }

}