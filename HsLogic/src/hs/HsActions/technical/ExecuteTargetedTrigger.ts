"use strict";

namespace HSLogic {

    export interface TargetedTriggerParam extends ChooseActionParam<HsEntity> {
        actionBuilder: FActionsBuilder<HsEntity, ChooseActionParam<HsEntity>>
    }

    export class ExecuteTargetedTrigger<P extends TargetedTriggerParam> extends HsAction<P> {
        resolve( _this_: ExecuteTargetedTrigger<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = _this_.param;

                    resolve( param.actionBuilder( param, gameCtx ) );
                }
            )
        }
    }
}