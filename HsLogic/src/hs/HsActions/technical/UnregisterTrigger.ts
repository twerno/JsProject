/// <reference path="../../core/action.ts" />
"use strict";

namespace HsLogic {


    export interface UnregisterTriggerParam extends IActionParam {
        trigger: Trigger
    }


    export class UnregisterTrigger<P extends UnregisterTriggerParam> extends Action<P> {

        resolve( self: UnregisterTrigger<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param;

                    Collection.removeFrom( param.trigger.attachedTo.triggers, param.trigger );

                    resolve( jsAction.NO_CONSEQUENCES );
                }
            );
        }
    }

}