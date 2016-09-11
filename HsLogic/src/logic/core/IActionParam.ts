import {Player} from '../../model/card/Player';
import {ICardDef} from '../../model/schema/CardDef';
import {SOURCE_TYPE} from '../../Const';

export interface ISource {
    player: Player;
    card: ICardDef;
    sourceType: SOURCE_TYPE,
    turnNo: number,
    actionId: string
}

export interface IActionParam {
    source: ISource;
    suspendEvents?: string[]
}