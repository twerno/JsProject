"use strict";

namespace HsLogic {


    export enum DAMAGE_STATE {
        PENDING, DEALT, PREVENTED
    }


    export interface DamageParam extends IActionParam {
        damageType: Def.DAMAGE_TYPE,
        target: Character,
        amount: number,

        damageState: DAMAGE_STATE,
        notifyMode: NOTIFY_MODE
    }


    export interface DamageTargetsParam extends IActionParam {
        damageType: Def.DAMAGE_TYPE,
        targets: Character[],
        amount: number,

        damageState: DAMAGE_STATE,
        notifyMode: NOTIFY_MODE,

        customDamagePower?: ( param: DamageTargetsParam, context: HsGameCtx ) => number
    }


    export interface MultistepDamageParam extends IActionParam {
        steps: DamageTargetsParam[],
        notifyEventMode: NOTIFY_MODE
    }




}