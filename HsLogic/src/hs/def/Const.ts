"use strict";

namespace Def {

    export enum DAMAGE_TYPE {
        COMBAT, DIRECT, PAY_LIFE, FATIGUE
    }

    export enum HEAL_TYPE {
        DIRECT
    }

    export enum SPLIT_MODE {
        ARCANE_MISSILE, MAD_BOMB, ARCANE_HEAL
    }

    export enum RARITY {
        //        FREE,
        COMMON,
        RARE,
        EPIC,
        LEGANDARY
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

    export enum ENCHANTMENT_TYPE {
        ATTACH_HEALTH,
        OTHER
    }
}