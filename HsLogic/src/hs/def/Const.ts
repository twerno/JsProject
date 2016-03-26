"use strict";

namespace Def {

    export type Entity = HsLogic.HsEntity;
    export type Card = HsLogic.Card;
    export type Minion = HsLogic.Minion;
    export type Player = HsLogic.Player;
    export type Character = HsLogic.Character;
    export type HsSource = HsLogic.ISource;
    export type HsCancelableParam = HsLogic.IHsCancelableParam;
    export type GameCtx = HsLogic.HsGameCtx;
    export type IActionParam = HsLogic.IActionParam;
    export type ActionEvent = HsLogic.ActionEvent<IActionParam>;
    export type ActionEventClass = HsLogic.ActionEventClass;


    export enum DAMAGE_TYPE {
        COMBAT, DIRECT, PAY_LIFE, FATIGUE
    }

    export enum HEAL_TYPE {
        DIRECT
    }

    export enum SPLIT_MODE {
        MISSILE, MAD_BOMB
    }

    export type FSingleTargetActionBuilder<T extends HsLogic.HsEntity> = ( source: HsSource, target: T, context: GameCtx ) => Action[];

    export type FTargetsActionBuilder<T extends HsLogic.HsEntity> = ( source: HsSource, targets: T[], context: GameCtx ) => Action[];
}