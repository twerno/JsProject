import { ActionType } from '../../logic/core/IAction';
import { Card } from '../card/Card';
import { Entity } from '../Entity';
import { ActionEventType } from '../../logic/core/ActionEvent';
import { Enchantment } from './Enchantment';


export abstract class Trigger<T extends Card, E extends ActionEventType> extends Entity {

    readonly parent: Enchantment<T>;

    get orderOfPlay(): number { return this.parent.orderOfPlay }

    readonly priority: number;

    readonly event: E;

    triggerable(_event: E, _gameEnv: Object): boolean {
        return true;
    }

    abstract action(_event: E, _gameEnv: Object): ActionType[];
}

export abstract class NoParentEventTrigger<T extends Card, E extends ActionEventType> extends Trigger<T, E> {

    triggerable(_event: E, _gameEnv: Object): boolean {
        // return this.parent.attachedTo !== event.source.card;
        return false;
    }
}