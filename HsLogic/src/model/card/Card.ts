import {Zone} from '../board/Zone';
import {Entity} from '../Entity';
import {Enchantment} from '../mechanics/Enchantment';
import {ICardDef} from '../schema/CardDef';
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


export class Minion extends Card {
    
    body: Body = new Body();
    minion_type: string;

}


export class Body {
    hp(): number { return this.health - this.damages };
    health: number = 0;
    attack: number = 0;
    damages: number = 0;
    armor: number = 0;
}


export class Secret extends Card {

    classOfCard: string;
}

