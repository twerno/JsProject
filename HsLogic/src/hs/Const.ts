"use strict";

namespace HsLogic {

    export type Character = Minion | Hero;
    export type Permanent = Character | Weapon;
    export type CharacterExt = Minion | Hero | Player;
    export type PermanentExt = Character | Weapon | Player;


    export enum SOURCE_TYPE {
        MINION = <any>"MINION",
        SPELL = <any>"SPELL",
        HERO_POWER = <any>"HERO_POWER",
        PLAYER = <any>"PLAYER",
        HERO = <any>"HERO",
        NONE = <any>"NONE"
    }
}