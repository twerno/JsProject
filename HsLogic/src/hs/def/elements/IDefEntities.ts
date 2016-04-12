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

        triggers: IDefTrigger[],
        //enchantments?: Object[];

        isPlayalble?: ( source: ISource, context: HsGameCtx ) => boolean;
        isActive?: ( source: ISource, context: HsGameCtx ) => boolean;
    }


    export interface ISpell extends ICard {
        onPlayAction: IDefAction
    }


    export interface IMinion extends ICard {
        hp: number;
        attack: number;
        minion_type: MINION_TYPE,

        battlecry: IDefAction,

        tags: TagClass[],
    }


    export interface IWeapon extends ICard {
        attack: number,
        durability: number,

        battlecry: IDefAction,

        tags: TagClass[],

    }

}