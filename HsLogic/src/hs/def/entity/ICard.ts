"use strict";

namespace HSLogic {

    export interface ICard extends IHsEntity {
        cost: number;

        triggers: ITriggers,

        isPlayalble?: ( caster: Player, gameCtx: HsGameCtx ) => boolean;
        isActivated?: ( caster: Player, gameCtx: HsGameCtx ) => boolean;
    }
}