"use strict";

namespace HsLogic {

    export type Character = Player | Minion;
    export type Permanent = Character | Weapon;


    export enum SOURCE_TYPE {
        MINION,
        SPELL,
        HERO_POWER,
        HERO,
        NONE
    }
}