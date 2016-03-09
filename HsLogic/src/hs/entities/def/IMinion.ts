"use strict";

namespace HSLogic {



    export enum MINION_TYPE {
        BEAST, DEMON, DRAGON, MECH, MURLOC, PIRATE, TOTEM, GENERAL
    }



    export interface IMinion extends ICard {
        hp: number;
        attack: number;
        sub_type: MINION_TYPE,

        battlecry?: IDefAltActions

    }
}