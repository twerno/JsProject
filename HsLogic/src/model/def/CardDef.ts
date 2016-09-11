import * as Const from '../../Const';


export type LinkedType = ICardDef | Object;

export interface ICardDef {
    cardDefId : string,
    baseCost: number,
    metadata: IMetadata,
    overload?: number,
    linkedCards?: LinkedType[],
    isPlayalble?: (source: Object, gameCtx: Object) => boolean;
    isActive?: (source: Object, gameCtx: Object) => boolean;
}

export interface IMetadata {
    cardClass: string,
    rarity: Const.CARD_RARITY,
    collectible: boolean,
    set: string,
    cardType: string
}

export function metadata(cardClass: string, rarity: Const.CARD_RARITY, collectible: boolean = true): IMetadata {
    return {
        cardClass: cardClass,
        rarity: rarity,
        collectible: collectible,
        set: '',
        cardType: ''
    };
}
