"use strict";

namespace Def {

    export type HsSource = HSLogic.IHsSource;
    export type GameCtx = HSLogic.HsGameCtx;


    export enum DAMAGE_TYPE {
        COMBAT, DIRECT, PAY_LIFE, FATIGUE
    }

    export enum SPLIT_MODE {
        MISSILE, MAD_BOMB
    }
}