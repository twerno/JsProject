import {Player} from '../card/Player';
import {Entity} from '../Entity';
import {Card} from '../card/Card';

export class Zone extends Entity {

    owner: Player | null;

    cards : Card[];
}