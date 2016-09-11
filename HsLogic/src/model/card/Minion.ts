import {Card} from './Card';


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