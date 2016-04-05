"use strict";

namespace HsLogic {

    export interface IPermanent {
        states: PermanentState<any>[];
    }

    export interface ICharacterState {
        attack: number,
        hp: number,
        maxHp: number,
        flags: Def.IFlags
    }

    //    export interface IWeaponState {
    //        attack: number,
    //        durability: number,
    //
    //    }

}