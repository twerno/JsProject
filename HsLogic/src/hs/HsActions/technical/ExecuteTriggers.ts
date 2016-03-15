"use strict";

namespace HsLogic {

    export interface ExecuteTriggersParam extends IHsActionParam {
        defActions: Def.IDefAction[],
        targets: Def.ITargets[]
    }

    export class ExecuteTriggers<P extends ExecuteTriggersParam> extends HsAction<P> {
        resolve( _this_: ExecuteTriggers<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = _this_.param,
                        actions: jsLogic.IAction<HsGameCtx>[] = [],
                        defAction: Def.IDefAction;

                    if ( param.defActions.length !== param.targets.length ) {
                        reject( new Error( `Lenght of targetedTriggesParam does not equal to lenght of trigger array.` ) );
                        return;
                    }

                    for ( let i = 0; i < param.defActions.length; i++ ) {
                        defAction = param.defActions[i];

                        if ( Def.isTargetedActionDef( defAction ) )
                            actions.push( new ExecuteTargetedTrigger<TargetedTriggerParam>( {
                                source: param.source,
                                defAction: defAction,
                                targets: param.targets[i]
                            }) );

                        else if ( Def.isTargetlessActionDef( defAction ) )
                            actions.push( gameCtx.actionFactory.executeTargetlessTriggers( {
                                source: param.source,
                                defActions: [defAction]
                            }) );

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