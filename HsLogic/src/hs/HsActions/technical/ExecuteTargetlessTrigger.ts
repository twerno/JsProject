"use strict";

namespace HsLogic {

    export interface ITargetlessTriggersParam extends IHsActionParam {
        defActions: Def.IDefTargetlessAction[]
    }

    export class ExecuteTargetlessTriggers<P extends ITargetlessTriggersParam> extends HsAction<P> {
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