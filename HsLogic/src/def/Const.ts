"use strict";

namespace Def {

    export enum DAMAGE_TYPE {
        COMBAT = <any>"COMBAT",
        DIRECT = <any>"DIRECT",
        PAY_LIFE = <any>"PAY_LIFE",
        FATIGUE = <any>"FATIGUE"
    }

    export enum HEAL_TYPE {
        DIRECT = <any>"DIRECT",
    }

    export enum SPLIT_MODE {
        ARCANE_MISSILE = <any>"ARCANE_MISSILE",
        MAD_BOMB = <any>"MAD_BOMB",
        ARCANE_HEAL = <any>"ARCANE_HEAL",
    }

    export enum CARD_RARITY {
        COMMON = <any>"COMMON",
        RARE = <any>"RARE",
        EPIC = <any>"EPIC",
        LEGENDARY = <any>"LEGENDARY",
    }

    export namespace MINION_TYPE {
        export const BEAST: string = 'BEAST';
        export const DEMON: string = 'DEMON';
        export const DRAGON: string = 'DRAGON';
        export const MECH: string = 'MECH';
        export const MURLOC: string = 'MURLOC';
        export const PIRATE: string = 'PIRATE';
        export const TOTEM: string = 'TOTEM';
        export const GENERAL: string = 'GENERAL';
    }

    export namespace KEYWORD {
        export const ENRAGE: string = 'ENRAGE';
        export const LIFE_LINK: string = 'LIFE_LINK';
        export const DEATHRATTLE: string = 'DEATHRATTLE';
        export const AURA: string = 'AURA';
        export const ENCHANT: string = 'ENCHANT';
        export const WHENEVER_YOU_CAST_SPELL: string = 'WHENEVER_YOU_CAST_SPELL';
        export const NONE: string = 'NONE';
    }

    export namespace CARD_CLASS {
        export const NEUTRAL: string = 'NEUTRAL';

        export const DRUID: string = 'DRUID';
        export const HUNTER: string = 'HUNTER';
        export const MAGE: string = 'MAGE';
        export const PALADIN: string = 'PALADIN';
        export const PRIEST: string = 'PRIEST';
        export const ROGUE: string = 'ROGUE';
        export const SHAMAN: string = 'SHAMAN';
        export const WARLOCK: string = 'WARLOCK';
        export const WARRIOR: string = 'WARRIOR';

        export const DREAM: string = 'DREAM';
    }

    export enum AURA_TYPE {
        ATTACK_HEALTH = <any>"ATTACK_HEALTH",
        OTHER = <any>"OTHER"
    }

    export enum FILTER_COMPARE_MODE {
        LESS_THAN,
        LESS_THAN_OR_EQUAL_TO,
        EQUAL_TO,
        GREATER_THAN,
        GREATER_THAN_OR_EQUAL_TO,
        NOT_EQUAL_TO
    }

    export namespace CARD_TYPE {
        export const MINION: string = 'MINION';
        export const SPELL: string = 'SPELL';
        export const WEAPON: string = 'WEAPON';
        export const SECRET: string = 'SECRET';
        export const HERO: string = 'HERO';
        export const HERO_POWER: string = 'HERO_POWER';
    }


    export const UNDEFINED: string = 'UNDEFINED';
}