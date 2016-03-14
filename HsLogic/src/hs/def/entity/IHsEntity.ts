"use strict";

namespace HSLogic {

    export enum CARD_TYPE {
        SPELL,
        MINION,
        WEAPON,
        PLAYER,
        HERO_POWER,
        HERO,
        NONE
    }


    export interface IHsEntity {
        name: string,
        cardType: CARD_TYPE,
        //owner: Player,

        enchantments?: IEnchantment[];
    }

    export function isMinion( entity: IHsEntity ): entity is IMinion {
        return entity.cardType === CARD_TYPE.MINION;
    }



}