/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {

    export class MultistepHeal<P extends MultistepHealParam> extends Action<P> {

        resolve(self: MultistepHeal<P>, gameCtx: HsGameCtx): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                (resolve, reject): void => {
                    let param: P = self.param,
                        actions: ActionType[] = [];

                    for (let i = 0; i < param.steps.length; i++) {
                        param.steps[i].notifyMode = param.notifyMode;

                        actions.push(gameCtx.actionFactory.calculateAndHeal(param.steps[i]));
                    }

                    if (param.notifyMode === NOTIFY_MODE.AFTER_ALL_ACTIONS)
                        actions.push(new DispatchSavedEvents(event.Heal, gameCtx));

                    resolve(actions);
                }
                ); // return new Promise

        } // resolve(self: MultistepHeal

    } // export class MultistepHeal

}