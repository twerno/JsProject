"use strict";

namespace HSLogic {

    export interface IFlags {
        immune?: boolean,
        elusive?: boolean,
        divine_shield?: boolean,
        charge?: boolean,
        forgetful?: boolean,
        freezed?: boolean,
        stealth?: boolean,
        taunt?: boolean,
        windfury?: boolean
    }

    export interface IPlayer extends IHsEntity {
        hp: number,

        manaCrystals: number,

        hero: any,

        heroPower: any

        flags: IFlags
    }
}