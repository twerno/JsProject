"use strict";

namespace jsLogic {

    export const DEFAULT_TRIGGER_LEVEL = 100;
    export const QUEUE_TRIGGER_FIRST = 0;
    export const QUEUE_TRIGGER_LAST = 200;


    export abstract class GameEvent {
        eventName: string;
    }


    export abstract class Trigger<T> {
        // triggers will trigger in order from the lowest level to the higest
        // triggers with equals level: trigger registered first will trigger first
        // queue_level has to be a positive number
        queue_level: number = DEFAULT_TRIGGER_LEVEL;
    
        abstract respondsTo( event: GameEvent ): boolean;

        abstract trigger( event: GameEvent ): IAction<T>;
    }


    export class TriggerList<T> {
        
        private _triggers: Trigger<T>[] = [];

        registerTrigger( trigger: Trigger<T> ): void {
            this._triggers.push( trigger );
        }

        unregisterTrigger( trigger: Trigger<T> ): void {
            Collection.removeFrom( this._triggers, trigger );
        }

        collectActionsFromTriggersFor( event: GameEvent ): IAction<T>[] {
            let actionsByQueueLevel: Array<IAction<T>[]> = this._getActionsByQueueLevel( event );

            // last action on list is first action to resolve, so reverse()
            return this._flatActionsByQueueLevel( actionsByQueueLevel.reverse() );
        } 

        private _getActionsByQueueLevel( event: GameEvent ): Array<IAction<T>[]> {
            let result: Array<IAction<T>[]> = [];
            let triggers: IAction<T>[] = [];
            let trigger: Trigger<T>;

            for ( let i = 0; i < this._triggers.length; i++ ) {
                if ( this._triggers[i].respondsTo( event ) ) {
                    trigger = this._triggers[i]; 
                    triggers = result[trigger.queue_level] || [];
                    result[trigger.queue_level] = triggers;

                    if ( trigger.queue_level < 0 )
                        throw new Error( `queue_levelof ${trigger} has to be a positive number.`);

                    triggers.push( trigger.trigger( event ) );
                }
            }

            return result;
        }

        private _flatActionsByQueueLevel( actionsByQueueLevel: Array<IAction<T>[]> ): IAction<T>[] {
            let result: IAction<T>[] = [];
            let actions: IAction<T>[] = [];
            let j: number;

            for ( let i = 0; i < actionsByQueueLevel.length; i++ ) {
                actions = actionsByQueueLevel[i];
                if ( actions )
                    for ( j = 0; j < actions.length; j++ ) {
                        result.push( actions[j] );
                    }
            }
            return result;          
        }

    }
    
}