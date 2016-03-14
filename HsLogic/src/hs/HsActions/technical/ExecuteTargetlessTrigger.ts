"use strict";

namespace HSLogic {

    export interface TargetlessTriggersParam extends IHsActionParam {
        defActions: Def.IDefTargetlessAction[]
    }

    export class ExecuteTargetlessTriggers<P extends TargetlessTriggersParam> extends HsAction<P> {
        resolve( _this_: ExecuteTargetlessTriggers<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = _this_.param,
                        actions: jsLogic.IAction<HsGameCtx>[] = [];

                    if ( param.defActions )
                        for ( let i = 0; i < param.defActions.length; i++ )
                            actions.concat( param.defActions[i]( param.source, gameCtx ) );

                    resolve( actions );
                }
            )
        }
    }
}