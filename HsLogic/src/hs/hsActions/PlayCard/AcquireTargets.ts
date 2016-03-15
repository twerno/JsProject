///<reference path="../../core/HsAction.ts"/>
///<reference path="../../../core/action/abstractActions/CancelableAction.ts"/>

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
    export class AcquireTargets extends HsAction<IAcquireTargetsParam> {

        resolve( _this_: AcquireTargets, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: IAcquireTargetsParam = _this_.param,
                        actions: jsLogic.IAction<HsGameCtx>[] = [],
                        defAction: Def.IDefAction;

                    param.targets = new Array<Def.ITargets>( param.defActions.length );

                    for ( let i = 0; i < param.defActions.length; i++ ) {
                        defAction = param.defActions[i];
                        param.targets[i] = { targets: [] };

                        if ( Def.isTargetedActionDef( defAction ) ) {
                            actions.push(
                                defAction.acquireTargets( param, param.targets[i], gameCtx ) );
                        }
                    }

                    resolve( actions );
                }
            ); // return new Promise

        } // resolve( _this_: AcquireTargets

    } // export class AcquireTargets
}