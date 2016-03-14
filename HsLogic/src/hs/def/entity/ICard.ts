"use strict";

namespace Def {

    export interface ICard extends IHsEntity {
        cost: number;

        triggers: ITriggers,

        isPlayalble?: ( source: HsSource, gameCtx: GameCtx ) => boolean;
        isActivated?: ( source: HsSource, gameCtx: GameCtx ) => boolean;
    }
}