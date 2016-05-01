"use strict";

namespace Def {

    //    manaCrystals: number,
    //    hero: any,
    //    heroPower: any



    export interface ICard {
        name: string,
        //        text: string,
        cost?: number,
        metadata: IMetadata,

        triggers?: IDefTrigger[],
        tags?: TagClass[],

        overload?: number,

        isPlayalble?: ( source: ISource, gameCtx: HsGameCtx ) => boolean;
        isActive?: ( source: ISource, gameCtx: HsGameCtx ) => boolean;
    }


    export interface ISpell extends ICard {
        cost: number,
        spellTextAction: IDefAction
    }


    export interface IMinion extends ICard {
        cost: number,

        health: number;
        attack: number;
        minion_type: string,

        aura?: IDefAura[],
        battlecry?: IDefAction,
    }


    export interface IWeapon extends ICard {
        cost: number,

        attack: number,
        durability: number,

        aura?: IDefAura | IDefAura[],
        battlecry?: IDefAction,
    }


    export interface IHeroPower {
        name: string,
        cost: number,

        //aura?: IDefAura | IDefAura[],
        ability: IDefAction,
        isActivable?: ( source: ISource, gameCtx: HsGameCtx ) => boolean;
    }


    export interface IHero extends IMinion {
        armor: number,

        equipHeroActions: IDefAction
    }

}