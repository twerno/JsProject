/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {

    /**
     * DispatchEvent
     * http://hearthstone.gamepedia.com/Advanced_rulebook#Dominant_Player_Bug
     * http://hearthstone.gamepedia.com/Advanced_rulebook#Glossary
     *   - Humble safeguard: Minions are not allowed to trigger on themselves entering play. 
     *   - Double safeguard: Minions are not allowed to trigger twice on the same Event.
 	 */


    export class DispatchEvent extends Action<IActionParam> {

        constructor(public event: ActionEvent<IActionParam>) {
            super(null)
        }


        resolvable(gameCtx: HsGameCtx): boolean {
            return this.event
                && this.event.valid(gameCtx);
        }


        resolve(self: DispatchEvent, gameCtx: HsGameCtx): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                (resolve, reject): void => {
                    let param: IActionParam = self.event.param,
                        actions: ActionType[] = [],
                        triggers: Trigger[],
                        doneByDominantPlayer: Trigger[] = [];

                    // Dominant Player === active player (for sake of simplicity)
                    // Dominant Player Triggers
                    triggers = self._getDominantPlayerTriggers(gameCtx.activePlayer)
                        .buildSet(param.source, gameCtx);

                    // Dominant Player Queue
                    actions.push(new ProcessQueue({
                        source: param.source,
                        event: self.event,
                        triggers: triggers,
                        done: doneByDominantPlayer
                    }));


                    // Secondary Player Queue
                    actions.push(new InlineAction((resolve, reject): void => {
                        let innerActions: ActionType[] = [];
                        // Double safeguard
                        // Subtrack triggers that already had been triggered by dominant player
                        triggers = self._getSecondaryPlayerTriggers(gameCtx.activePlayer, doneByDominantPlayer)
                            .buildSet(param.source, gameCtx);

                        // Secondary Player Queue
                        innerActions.push(new ProcessQueue({
                            source: param.source,
                            event: self.event,
                            triggers: triggers,
                            done: []
                        }));
                        resolve(innerActions);

                    }));
                    resolve(actions);
                }

                ); // return new Promise
        }
        // resolve( self: DispatchEvent<P>


        protected _getDominantPlayerTriggers(player: Player): Def.ITargetSetBuilder<Trigger> {
            return new Def.TriggerSetBuilder(this.event)
                .addFilter(Def.Filter.ownedBy(player));
        }


        protected _getSecondaryPlayerTriggers(player: Player, triggeredByDominantPlayer: Trigger[]): Def.ITargetSetBuilder<Trigger> {
            return new Def.TriggerSetBuilder(this.event)
                .addFilter(Def.Filter.notOwnedBy(player))

            // Double safeguard
                .addFilter((source: ISource, trigger: Trigger, gameCtx: HsGameCtx): boolean => {
                    return triggeredByDominantPlayer.indexOf(trigger) === -1;
                });
        }
    }



    export interface QueueParam extends IActionParam {
        event: ActionEvent<IActionParam>,
        triggers: Trigger[],
        done: Trigger[]
    }


    export class ProcessQueue<P extends QueueParam> extends Action<P> {

        resolve(self: ProcessQueue<P>, gameCtx: HsGameCtx): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                (resolve, reject): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [];

                    for (let i = 0; i < param.triggers.length; i++) {
                        let trigger = param.triggers[i];

                        actions.push(new InlineActionExt(
                            (): boolean => {
                                return trigger.triggerable(trigger, param.event, gameCtx);
                            },
                            (resolve, reject): void => {
                                param.done.push(trigger);
                                resolve(trigger.actionBuilder(trigger, param.event, gameCtx));
                            }
                            ));
                    }
                    resolve(actions);
                });
        }
    }
}