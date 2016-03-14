"use strict";

namespace HSLogic {

    export interface IEnchantment extends IHsEntity {
        recalculate( owner: IHsEntity, gameCtx: HsGameCtx ): void;
    }


}