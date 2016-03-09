"use strict";

namespace HSLogic {

    export interface IPlayer extends IHsEntity {
        hp: number;

        manaCrystals: number;

        hero: any;

        heroPower: any;
    }
}