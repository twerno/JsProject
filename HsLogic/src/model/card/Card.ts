import {Zone} from '../board/Zone';
import {Entity} from '../Entity';
import {Enchantment} from '../mechanics/Enchantment';
import {ICardDef} from '../def/CardDef';
import {Player} from './Player';


export class Card extends Entity {

    controller: Player;
    zone: Zone;
    positionInZone: number;
    orderOfPlay: number;

    def: ICardDef;
    enchantments: Enchantment<this>[];
    
    compare(card: Card): number {
        return this.orderOfPlay - card.orderOfPlay;
    }
}


export class Secret extends Card {

    classOfCard: string;
}

