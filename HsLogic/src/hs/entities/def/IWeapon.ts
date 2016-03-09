"use strict";

namespace HSLogic {

    export interface IWeapon extends ICard {
        attack: number,
        durability: number,
        battlecry?: IDefAltActions
    }


}