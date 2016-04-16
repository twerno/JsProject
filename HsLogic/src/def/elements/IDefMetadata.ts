"use strict";

namespace Def {

    export interface IMetadata {
        cardClass: string,
        rarity: CARD_RARITY,
        collectible: boolean,
        set: string
    }

    export function metadata( cardClass: string, rarity: CARD_RARITY, collectible: boolean = true ): IMetadata {
        return {
            cardClass: cardClass,
            rarity: rarity,
            collectible: collectible,
            set: 'UNDEFINED'
        };
    }

}