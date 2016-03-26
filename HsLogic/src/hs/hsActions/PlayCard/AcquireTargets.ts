///<reference path="../../core/HsAction.ts"/>


"use strict";

namespace HsLogic {


    export interface IAcquireTargetsParam extends IHsCancelableParam {
        defActions: Def.IDefAction[],
        targets: Def.ITargets[]
    }


    /**
     * AcquireTargets
     *
     */
    export class AcquireTargets extends Action<IAcquireTargetsParam> {

        resolve( self: AcquireTargets, context: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: IAcquireTargetsParam = self.param,
                        actions: ActionType[] = [],
                        defAction: Def.IDefAction;

                    param.targets = new Array<Def.ITargets>( param.defActions.length );

                    for ( let i = 0; i < param.defActions.length; i++ ) {
                        defAction = param.defActions[i];
                        param.targets[i] = { targets: [] };

                        if ( Def.isTargetedActionDef( defAction ) ) {
                            actions.push(
                                defAction.acquireTargets( param, param.targets[i], context ) );
                        }
                    }

                    resolve( actions );
                }
            ); // return new Promise

        } // resolve( self: AcquireTargets

    } // export class AcquireTargets
}