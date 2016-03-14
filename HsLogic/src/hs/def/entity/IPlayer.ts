"use strict";

namespace Def {



    export interface IPlayer extends IHsEntity {
        hp: number,
        manaCrystals: number,
        hero: any,
        heroPower: any

        flags: IFlags
    }
}