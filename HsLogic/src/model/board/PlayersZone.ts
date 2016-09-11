import { Player } from '..\card\Player';
import { Minion } from '..cardMinion';
import { Card } from '..cardCard';
import { Zone } from './Zone';


export class PlayersZone {

    hand: Zone<Card>;
    deck: Zone<Card>;
    graveyard: Zone<Card>;
    removed_from_play: Zone<Card>;

    // hero: Zone<Hero>;
    // weapon: Zone<Weapon>;
    // heroPower: Zone<HeroPower>;

    play: Zone<Minion>;
    //  secret: Zone<Card>;

    constructor(public owner: Player) { }
}