"use strict";

namespace HSLogic {

    //export interface TargetlessTriggerParam extends IHsActionParam {
    //    trigger: ITargetlessTriggerDef
    //}

    //export class ExecuteTargetlessTrigger<P extends TargetlessTriggerParam> extends HsAction<P> {
    //    resolve( _this_: ExecuteTargetlessTrigger<P>, gameCtx: HsGameCtx ): PromiseOfActions {

    //        return new Promise<jsLogic.IAction<HsGameCtx>[]>(
    //            ( resolve, reject ): void => {
    //                let param: P = _this_.param;

    //                resolve( param.trigger( param.source, gameCtx ) );
    //            }
    //        )
    //    }
    //}

    export interface TargetlessTriggersParam extends IHsActionParam {
        triggers: ITargetlessTriggerDef[]
    }

    export class ExecuteTargetlessTriggers<P extends TargetlessTriggersParam> extends HsAction<P> {
        resolve( _this_: ExecuteTargetlessTriggers<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = _this_.param,
                        actions: jsLogic.IAction<HsGameCtx>[] = [];

                    if ( param.triggers )
                        for ( let i = 0; i < param.triggers.length; i++ )
                            actions.concat( param.triggers[i]( param.source, gameCtx ) );

                    resolve( actions );
                }
            )
        }
    }
}