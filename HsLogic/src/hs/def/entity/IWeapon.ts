"use strict";

namespace Def {

    export interface IWeapon extends ICard {
        attack: number,
        durability: number,
    }

    export interface IWeaponImpl extends ICardImpl {
        attack: number,
        durability: number,
    }
}