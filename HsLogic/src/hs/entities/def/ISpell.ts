"use strict";

namespace HSLogic {



    export interface ISpell extends ICard {
        spellActions: IActionFactory<HsGameCtx, HsActionParam>[];
    }
}