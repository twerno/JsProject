/// <reference path="../../../core/action.ts" />
"use strict";

namespace HsLogic {

    export interface AcquireTargetsActionParam extends HsLogic.IHsCancelableParam {
        availableTargets: Permanent[],
        targets: Permanent[]
    }

    /**
     * ChooseSingleTarget
     *
 	 */
    export class ChooseSingleTarget<P extends AcquireTargetsActionParam> extends CancelableAction<P> {
        resolve( self: ChooseSingleTarget<P>, gameCtx: HsGameCtx ): PromiseOfActions {

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        results: Permanent[];

                    //@TODO - umozliwic uzytkownikowi dokonanie wyboru
                    results = MathUtils.selectAtRandom<Permanent>( param.availableTargets, { amount: 1 }) || [];
                    if ( results.length > 0 )
                        param.targets.push( results[0] );

                    resolve( jsAction.NO_CONSEQUENCES );
                });
        }
    }
}