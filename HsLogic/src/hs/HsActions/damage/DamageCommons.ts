/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {


    export enum DAMAGE_STATE {
        PENDING = <any>"PENDING",
        DEALT = <any>"DEALT",
        PREVENTED = <any>"PREVENTED",
    }


    export interface DamageParam extends IActionParam {
        damageType: Def.DAMAGE_TYPE,
        target: Character,
        amount: number,

        damageState: DAMAGE_STATE,
        notifyMode: NOTIFY_MODE
    }


    export interface SplitDamageParam extends IActionParam {
        damageType: Def.DAMAGE_TYPE,
        amount: number,

        splitMode: Def.SPLIT_MODE
    }


    export interface DamageTargetsParam extends CalculateDamageParam {
        targets: Character[],

        damageState?: DAMAGE_STATE,
        notifyMode?: NOTIFY_MODE,
    }


    export interface CalculateDamageParam extends IActionParam {
        damageType: Def.DAMAGE_TYPE,
        amount: number,

        customDamageBoostCalculator?: ( param: CalculateDamageParam, gameCtx: HsGameCtx ) => number
    }


    export interface MultistepDamageParam extends IActionParam {
        steps: DamageTargetsParam[],
        notifyMode: NOTIFY_MODE
    }

}