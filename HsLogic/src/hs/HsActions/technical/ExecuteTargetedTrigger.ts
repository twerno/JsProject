"use strict";

namespace HsLogic {

    export interface TargetedTriggerParam extends IActionParam {
        targets: Def.ITargets,
        defAction: Def.IDefTargetedAction<Def.ITargets>
    }

    export class ExecuteTargetedTrigger<P extends TargetedTriggerParam> extends Action<P> {
        resolve( self: ExecuteTargetedTrigger<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param;

                    resolve( param.defAction.actions( param.source, param.targets, gameCtx ) );
                }
            )
        }
    }
}