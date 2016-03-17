"use strict";

namespace Def {

    export interface ICard extends IHsEntity {
        name: string,
        cost: number;

        playActions: IDefAction[],
        triggers: IDefTrigger[],
        enchantments?: IEnchantment[];

        isPlayalble?: ( source: HsSource, gameCtx: GameCtx ) => boolean;
        isActivated?: ( source: HsSource, gameCtx: GameCtx ) => boolean;
    }

    export interface ICardImpl extends IHsEntityImpl {
        name: string,
        cost: number;

        playActions: IDefAction[],
        triggers: HsLogic.Trigger[],
        enchantments?: IEnchantment[];

        isPlayalble?: ( source: HsSource, gameCtx: GameCtx ) => boolean;
        isActivated?: ( source: HsSource, gameCtx: GameCtx ) => boolean;
    }
}