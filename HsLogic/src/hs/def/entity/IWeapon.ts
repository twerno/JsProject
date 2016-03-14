"use strict";

namespace Def {

    export interface IWeapon extends ICard {
        attack: number,
        durability: number,

        triggers: IPermanentTriggers
    }
}