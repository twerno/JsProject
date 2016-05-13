"use strict";

namespace Def {

    export type LinkedType = ICard | IHeroPower | IHero;

    export interface ICard {
        name: string,
        //        text: string,
        cost?: number,
        metadata: IMetadata,
        linked?: LinkedType[],

        mechanics?: IDefTrigger[],
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

        aura?: IDefAura[],
        battlecry?: IDefAction,
        customDurabilityLoseMechanic?: any
    }


    export interface IHeroPower {
        name: string,
        cost: number,

        //aura?: IDefAura | IDefAura[],
        linked?: LinkedType[],
        ability: IDefAction,
        isActivable?: ( source: ISource, gameCtx: HsGameCtx ) => boolean;
    }


    export interface IHero extends IMinion {
        armor: number,

        equipHeroActions: IDefAction
    }


    export interface ISecret extends ICard {

        mechanics: IDefTrigger[]
    }

}