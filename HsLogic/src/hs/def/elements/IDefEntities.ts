"use strict";

namespace Def {

    //    manaCrystals: number,
    //    hero: any,
    //    heroPower: any



    export interface ICard {
        name: string,
        cost: number,
        rarity: RARITY,
        uncollectible?: boolean,
        cardClass: string,

        triggers?: IDefTrigger[],
        tags?: TagClass[],

        isPlayalble?: ( source: ISource, context: HsGameCtx ) => boolean;
        isActive?: ( source: ISource, context: HsGameCtx ) => boolean;
    }


    export interface ISpell extends ICard {
        spellTextAction: IDefAction
    }


    export interface IMinion extends ICard {
        health: number;
        attack: number;
        minion_type: string,

        battlecry?: IDefAction,
    }


    export interface IWeapon extends ICard {
        attack: number,
        durability: number,

        battlecry?: IDefAction,
    }

}