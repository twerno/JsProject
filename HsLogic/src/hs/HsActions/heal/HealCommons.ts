/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {

    export enum NOTIFY_MODE {
        AFTER_EVERY_ACTION,
        AFTER_ALL_ACTIONS,
        AFTER_ALL_STEPS
    }

    export enum HEAL_STATE {
        PENDING, HEALED, PREVENTED
    }


    export interface HealParam extends IActionParam {
        target: Character,
        amount: number

        healState: HEAL_STATE,
        notifyMode: NOTIFY_MODE
    }


    export interface SplitHealParam extends IHsCancelableParam {
        amount: number,

        splitMode: Def.SPLIT_MODE
    }


    export interface HealTargetsParam extends CalculateHealParam {
        targets: Character[],

        healState?: HEAL_STATE,
        notifyMode?: NOTIFY_MODE,
    }


    export interface CalculateHealParam extends IHsCancelableParam {
        amount: number,

        customHealPowerCalculator?: ( param: CalculateHealParam, gameCtx: HsGameCtx ) => number
    }


    export interface MultistepHealParam extends IActionParam {
        steps: HealTargetsParam[],
        notifyEventMode: NOTIFY_MODE
    }
}