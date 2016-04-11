"use strict";

namespace Def {

    export enum DAMAGE_TYPE {
        COMBAT, DIRECT, PAY_LIFE, FATIGUE
    }

    export enum HEAL_TYPE {
        DIRECT
    }

    export enum SPLIT_MODE {
        MISSILE, MAD_BOMB
    }


    export enum MINION_TYPE {
        BEAST, DEMON, DRAGON, MECH, MURLOC, PIRATE, TOTEM, GENERAL
    }

    export type FSingleTargetActionBuilder<T extends HsLogic.HsEntity> = ( source: ISource, target: T, context: HsGameCtx ) => Action[];

    export type FTargetsActionBuilder<T extends HsLogic.HsEntity> = ( source: ISource, targets: T[], context: HsGameCtx ) => Action[];
}