"use strict";

namespace Def {

    export interface ICard extends IHsEntity {
        cost: number;

        triggers: ITriggers,

        isPlayalble?: ( source: HSLogic.IHsSource, gameCtx: HSLogic.HsGameCtx ) => boolean;
        isActivated?: ( source: HSLogic.IHsSource, gameCtx: HSLogic.HsGameCtx ) => boolean;
    }
}