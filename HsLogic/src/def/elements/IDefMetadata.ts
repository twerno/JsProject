"use strict";

namespace Def {

    export interface IMetadata {
        cardClass: string,
        rarity: CARD_RARITY,
        collectible: boolean,
        set: string,
        cardType: string
    }

    export function metadata( cardClass: string, rarity: CARD_RARITY, collectible: boolean = true ): IMetadata {
        return {
            cardClass: cardClass,
            rarity: rarity,
            collectible: collectible,
            set: Def.UNDEFINED,
            cardType: Def.UNDEFINED
        };
    }

}