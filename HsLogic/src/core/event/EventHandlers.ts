"use strict";

namespace jsLogic {


    export interface IActionParam {
        handlers: EventHandlers<IActionParam>;
    }


	/**
	 * EventHandlers
	 *
	 */
    export class EventHandlers<T extends IActionParam> {

        private _handlers: EventHandler[] = [];


        registerTrigger(trigger: EventHandler): void {
            this._handlers.push(trigger);
        }


        unregisterTrigger(trigger: EventHandler): void {
            Collection.removeFrom(this._handlers, trigger);
        }

		/*
		 *  collectConsequencesOf
		 *  return consequences of event in natural order (the lowest queue_level will be first)
		 *
		 */
        collectResponsesOf(event: ActionEvent<T>): IAction<T>[] {
            return this._flatResponsesByQueueLevel(this._getResponsesByQueueLevel(event));
        }


        private _getResponsesByQueueLevel(event: ActionEvent<T>): Array<IAction<IActionParam>[]> {
            let result: Array<IAction<IActionParam>[]> = [];
            let responses: IAction<IActionParam>[] = [];
            let handler: EventHandler;

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


        private _flatResponsesByQueueLevel(actionsByQueueLevel: Array<IAction<IActionParam>[]>): IAction<IActionParam>[] {
            let result: IAction<IActionParam>[] = [];
            let actions: IAction<IActionParam>[] = [];
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