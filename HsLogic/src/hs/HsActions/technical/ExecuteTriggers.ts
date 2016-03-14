"use strict";

namespace HSLogic {

    export interface ExecuteTriggersParam extends IHsActionParam {
        targetedTriggesParam: ChooseActionParam<HsEntity>[],
        triggers: ITriggerDef[]
    }

    export class ExecuteTriggers<P extends ExecuteTriggersParam> extends HsAction<P> {
        resolve( _this_: ExecuteTriggers<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = _this_.param,
                        actions: jsLogic.IAction<HsGameCtx>[] = [],
                        trigger: ITriggerDef;

                    if ( param.triggers.length !== param.targetedTriggesParam.length ) {
                        reject( new Error( `Lenght of targetedTriggesParam does not equal to lenght of trigger array.` ) );
                        return;
                    }

                    for ( let i = 0; i < param.triggers.length; i++ ) {
                        trigger = param.triggers[i];

                        if ( isTargetedTriggerDef( trigger ) )
                            actions.concat( trigger.actions( {
                                source: param.source,
                                sets: param.targetedTriggesParam[i].sets,
                                require: param.targetedTriggesParam[i].require
                            }, gameCtx
                            ) );
                        else if ( isTargetlessTriggerDef( trigger ) )
                            actions.concat( trigger( param.source, gameCtx ) );
                        else {
                            reject( new Error( `Unknown trigger type` ) );
                            return;
                        }
                    }

                    resolve( actions );
                }
            )
        }
    }
}