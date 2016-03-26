"use strict";

namespace HsLogic {

    export enum NOTIFY_MODE {
        AFTER_EVERY_ACTION,
        AFTER_ALL_ACTIONS,
        AFTER_ALL_STEPS
    }


    export interface HealedParam extends IActionParam {
        target: Character,
        healed: number
    }


    export interface HealParam extends IHsCancelableParam {
        targets: HealedParam[],
        amount: number,
        notifyMode?: NOTIFY_MODE
    }

    export interface MultistepHealParam extends IActionParam {
        steps: HealParam[],
        notifyEventMode: NOTIFY_MODE
    }


    export namespace event {

        export class TargetHealed<P extends HealedParam> extends ActionEvent<P> { }

        export class PreHealCalculationEvent<P extends HealParam> extends ActionEvent<P> { }

        export class PostHealCalculationEvent<P extends HealParam> extends ActionEvent<P> { }
    }

}