"use strict";

namespace HSLogic {

    export interface IFlags {
        immune?: boolean
    }

    export interface IPlayer extends IHsEntity {
        hp: number,

        manaCrystals: number,

        hero: any,

        heroPower: any

        flags: IFlags
    }
}