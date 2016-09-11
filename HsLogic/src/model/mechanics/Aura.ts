import {Card} from '../card/Card';
import {IDefTarget} from '../schema/IDefTarget';
import {Entity} from '../Entity';
import {Enchantment} from './Enchantment';


export enum REBUILD_MODE {
    STATIC = <any>"STATIC",
    DYNAMIC = <any>"DYNAMIC",
}


export abstract class Aura<T extends Card> extends Entity {
    parent: Enchantment<T>;

    get attachedTo(): T { return this.parent.attachedTo }
    get orderOfPlay(): number { return this.parent.orderOfPlay }

    abstract targetDef(): IDefTarget<Card>;

    abstract update(target: Card, enchantmentAttachedToTarget: Enchantment<Card> | null, gameEnv: Object): Enchantment<Card>;
}
