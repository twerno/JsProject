"use strict";

namespace Def {

    export interface ICard extends IHsEntity {
        cost: number;

        playActions: IDefAction[],
        triggers: ITriggers,

        isPlayalble?: ( source: HsSource, gameCtx: GameCtx ) => boolean;
        isActivated?: ( source: HsSource, gameCtx: GameCtx ) => boolean;
    }
}