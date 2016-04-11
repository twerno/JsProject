"use strict";

namespace Def {

    //    manaCrystals: number,
    //    hero: any,
    //    heroPower: any



    export interface ICard {
        name: string,
        cost: number;

        triggers: IDefTrigger[],
        //enchantments?: Object[];

        isPlayalble?: ( source: ISource, context: HsGameCtx ) => boolean;
        isActive?: ( source: ISource, context: HsGameCtx ) => boolean;
    }


    export interface ISpell extends ICard {
        onPlayActions: IDefAction[]
    }


    export interface IMinion extends ICard {
        hp: number;
        attack: number;
        minion_type: MINION_TYPE,

        battlecry: IDefAction[],

        tags: ITags,

    }


    export interface IWeapon extends ICard {
        attack: number,
        durability: number,

        battlecry: IDefAction[],

        tags: ITags,

    }

}