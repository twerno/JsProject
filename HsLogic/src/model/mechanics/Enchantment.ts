import {Card} from '../card/Card';
import {Entity} from '../Entity';
import {ActionEventType} from '../../logic/core/ActionEvent';
import {Aura} from './Aura';
import {Tag} from './Tag';
import {Trigger} from './Trigger';




//export type Effect<T> = Tag | Aura<T> | Trigger<T>;


// Container
export abstract class Enchantment<T extends Card> extends Entity {

    attachedTo: T;
    parent: Aura<Card> | null;
    orderOfPlay: number;

    name: string;
    desc: string;

    mechanic?: string;
    priority?: number;

    effects: IEffect<T>;
}


export interface IEffect<T extends Card> {
    tags? : Tag[],
    auras?: Aura<T>[],
    triggers?: Trigger<T, ActionEventType>[]
}