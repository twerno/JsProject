"use strict";

namespace Def {

    export interface ICard extends IHsEntity {
        name: string,
        cost: number;

        playActions: IDefAction[],
        triggers: IDefTrigger[],
        enchantments?: Object[];

        isPlayalble?: ( source: HsSource, context: GameCtx ) => boolean;
        isActivated?: ( source: HsSource, context: GameCtx ) => boolean;
    }

    export interface ICardImpl extends IHsEntityImpl {
        name: string,
        cost: number;

        playActions: IDefAction[],
        triggers: HsLogic.Trigger[],
        enchantments?: Object[];

        isPlayalble?: ( source: HsSource, context: GameCtx ) => boolean;
        isActivated?: ( source: HsSource, context: GameCtx ) => boolean;
    }
}