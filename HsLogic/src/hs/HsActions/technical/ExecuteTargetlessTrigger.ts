"use strict";

namespace HsLogic {

    export interface ITargetlessTriggersParam extends IActionParam {
        defActions: Def.IDefTargetlessAction[]
    }

    export class ExecuteTargetlessTriggers<P extends ITargetlessTriggersParam> extends Action<P> {
        resolve( self: ExecuteTargetlessTriggers<P>, context: HsGameCtx ): PromiseOfActions {

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        actions: jsLogic.IAction<HsGameCtx>[] = [];

                    if ( param.defActions )
                        for ( let i = 0; i < param.defActions.length; i++ )
                            actions.concat( param.defActions[i]( param.source, context ) );

                    resolve( actions );
                }
            )
        }
    }
}