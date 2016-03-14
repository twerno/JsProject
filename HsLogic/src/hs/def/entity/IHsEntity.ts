"use strict";

namespace Def {

    export enum CARD_TYPE {
        SPELL,
        MINION,
        WEAPON,
        PLAYER,
        HERO_POWER,
        HERO,
        NONE
    }


    export interface IHsEntity {
        name: string,
        cardType: CARD_TYPE,

        enchantments?: IEnchantment[];
    }
}