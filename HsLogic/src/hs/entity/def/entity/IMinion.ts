"use strict";

namespace HSLogic {



    export enum MINION_TYPE {
        BEAST, DEMON, DRAGON, MECH, MURLOC, PIRATE, TOTEM, GENERAL
    }



    export interface IMinion extends ICard {
        hp: number;
        attack: number;
        minion_type: MINION_TYPE,
        flags: IFlags,

        battlecry: ICardActionDefs

    }
}