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


    export interface HealTargetsParam extends IActionParam {
        targets: Character[],
        amount: number,

        healState: HEAL_STATE,
        notifyMode: NOTIFY_MODE,

        customHealPower?: ( param: HealTargetsParam, context: HsGameCtx ) => number
    }


    export interface MultistepHealParam extends IActionParam {
        steps: HealTargetsParam[],
        notifyEventMode: NOTIFY_MODE
    }


    export namespace event {


    }

}