"use strict";

namespace HSLogic {

    export enum CARD_TYPE {
        SPELL,
        MINION,
        WEAPON,
        PLAYER,
        HERO_POWER,
        HERO
    }


    export interface IHsEntity {
        name: string;
        type: CARD_TYPE;
    }

}