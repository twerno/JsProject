"use strict";

namespace HsLogic {

    //export interface IChooseSingleTargetParam<T extends HsEntity> extends IHsCancelableParam {
    //    sets: {
    //        source: T[],
    //        result: T
    //    }
    //}


    /**
     * ChooseSingleTarget
     *
 	 */
    export class ChooseSingleTarget<P extends Def.AcquireTargetsParam> extends Action<P> {
        resolve( self: ChooseSingleTarget<P>, context: HsGameCtx ): PromiseOfActions {

            if ( self.param.cancelAction.value )
                return Promise.resolve( [] );

            return new Promise<ActionType | ActionType[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param,
                        results: Def.Target[];

                    //@TODO - umozliwic uzytkownikowi dokonanie wyboru
                    results = MathUtils.selectAtRandom<Def.Target>( param.availableTargets, { amount: 1 }) || [];
                    if ( results.length > 0 )
                        param.targets.push( results[0] );

                    resolve( jsLogic.NO_CONSEQUENCES );
                });
        }
    }
}