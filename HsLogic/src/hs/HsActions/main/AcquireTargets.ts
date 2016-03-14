///<reference path="../../core/HsAction.ts"/>
///<reference path="../../../core/action/abstractActions/CancelableAction.ts"/>

"use strict";

namespace HSLogic {



    export interface IAcquireTargetsParam extends IHsActionParam {
        defActions: Def.IDefAction[],
        targets: Def.ITargets[]
        cancelAction?: { value: boolean }
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
                        actions: jsLogic.IAction<HsGameCtx>[] = [];

                    param.targets = new Array<Def.ITargets>( param.defActions.length );

                    for ( let i = 0; i < param.defActions.length; i++ ) {
                        let defAction: Def.IDefAction = param.defActions[i];

                        if ( Def.isTargetedActionDef( defAction ) ) {
                            actions.push(
                                defAction.acquireTargets( param.source, param.targets[i], gameCtx ) );
                        }
                    }

                    resolve( actions );
                });
        }
    }

}