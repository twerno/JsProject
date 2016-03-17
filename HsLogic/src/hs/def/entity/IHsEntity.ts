"use strict";

namespace Def {

    export enum TYPE {
        SPELL,
        MINION,
        WEAPON,
        PLAYER,
        HERO_POWER,
        HERO,
        NONE,
        TRIGGER,
        UNKNOWN
    }


    export interface IHsEntity {

    }

    export interface IHsEntityImpl {
        id: number,
        def: IHsEntity,
        type: TYPE,
        owner: Player,

        orderOfPlay: number,
    }
}