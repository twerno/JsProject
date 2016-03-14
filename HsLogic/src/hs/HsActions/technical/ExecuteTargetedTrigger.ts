"use strict";

namespace HsLogic {

    export interface TargetedTriggerParam extends IHsActionParam {
        targets: Def.ITargets,
        defAction: Def.IDefTargetedAction<Def.ITargets>
    }

    export class ExecuteTargetedTrigger<P extends TargetedTriggerParam> extends HsAction<P> {
        resolve( _this_: ExecuteTargetedTrigger<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = _this_.param;

                    resolve( param.defAction.actions( param.source, param.targets, gameCtx ) );
                }
            )
        }
    }
}