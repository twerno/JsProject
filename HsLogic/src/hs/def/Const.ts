﻿"use strict";

namespace Def {

    export type HsSource = HsLogic.IHsSource;
    export type GameCtx = HsLogic.HsGameCtx;


    export enum DAMAGE_TYPE {
        COMBAT, DIRECT, PAY_LIFE, FATIGUE
    }

    export enum SPLIT_MODE {
        MISSILE, MAD_BOMB
    }
}