"use strict";

namespace HSLogic {

    export enum CARD_TYPE {
        SPELL,
        MINION,
        WEAPON,
        PLAYER,
        HERO_POWER,
        HERO
    }


    export interface IHsEntity {
        name: string;
        card_type: CARD_TYPE;
    }

    export function isMinion( entity: IHsEntity ): entity is IMinion {
        return entity.card_type === CARD_TYPE.MINION;
    }

}