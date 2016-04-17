"use strict";

namespace HsLogic {

    export type Character = Minion | Hero;
    export type Permanent = Character | Weapon;


    export enum SOURCE_TYPE {
        MINION,
        SPELL,
        HERO_POWER,
        PLAYER,
        HERO,
        NONE
    }
}