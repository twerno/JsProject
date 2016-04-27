/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {


    export interface RegisterTriggerParam extends IActionParam {
        trigger: Trigger
    }


    export class RegisterTrigger<P extends RegisterTriggerParam> extends Action<P> {

        resolve(self: RegisterTrigger<P>, gameCtx: HsGameCtx): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                (resolve, reject): void => {
                    let param: P = self.param;

                    param.trigger.attachedTo.triggers.push(param.trigger);

                    resolve(jsAction.NO_CONSEQUENCES);
                }
                );
        }
    }

}