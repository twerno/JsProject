"use strict";

namespace jsLogic {

	/**
	 * EventHandlers
	 *
	 */
    export class EventHandlers<T extends IHasHandlersAndBuilder, P extends IEventParam<T>> {

        private _handlers: EventHandler<T, P>[] = [];


        registerTrigger(trigger: EventHandler<T, P>): void {
            this._handlers.push(trigger);
        }


        unregisterTrigger(trigger: EventHandler<T, P>): void {
            Collection.removeFrom(this._handlers, trigger);
        }

		/*
		 *  collectConsequencesOf
		 *  return consequences of event in natural order (the lowest queue_level will be first)
		 *
		 */
        collectResponsesOf(event: ActionEvent<T, P>): IAction<T>[] {
            if (event instanceof Array)
                return this._flatterResponsesOrderedByQueueLevel(this._getResponsesByQueueLevel(event));
            else
                return [];
        }


        private _getResponsesByQueueLevel(event: ActionEvent<T, P>): Array<IAction<T>[]> {
            let result: Array<IAction<T>[]> = [];
            let responses: IAction<T>[] = [];
            let handler: EventHandler<T, P>;

            for (let i = 0; i < this._handlers.length; i++) {
                handler = this._handlers[i];
                if (handler.isRespondingTo(event)) {
                    responses = result[handler.queue_level] || [];
                    result[handler.queue_level] = responses;

                    if (handler.queue_level < 0)
                        throw new Error(`queue_level of ${handler} has to be a positive number.`);

                    responses.push(handler.trigger(event));
                }
            }

            return result;
        }


        private _flatterResponsesOrderedByQueueLevel(actionsByQueueLevel: Array<IAction<T>[]>): IAction<T>[] {
            let result: IAction<T>[] = [];
            let actions: IAction<T>[] = [];
            let j: number;

            for (let i = 0; i < actionsByQueueLevel.length; i++) {
                actions = actionsByQueueLevel[i];
                if (actions)
                    for (j = 0; j < actions.length; j++) {
                        result.push(actions[j]);
                    }
            }
            return result;
        }

    }

}