"use strict";

namespace HsLogic {

    export interface IChooseSingleTargetParam<T extends HsEntity> extends IHsCancelableParam {
        sets: {
            source: T[],
            result: T
        }
    }


    /**
     * ChooseSingleTarget
     *
 	 */
    export class ChooseSingleTarget<T extends HsEntity, P extends IChooseSingleTargetParam<T>> extends HsAction<P> {
        resolve( _this_: ChooseSingleTarget<T, P>, gameCtx: HsGameCtx ): PromiseOfActions {

            if ( _this_.param.cancelAction.value )
                return Promise.resolve( [] );

            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = _this_.param,
                        results: T[];

                    //@TODO - umozliwic uzytkownikowi dokonanie wyboru
                    results = MathUtils.selectAtRandom<T>( param.sets.source, { amount: 1 }) || [];
                    if ( results.length > 0 )
                        param.sets.result = results[0];

                    resolve( jsLogic.NO_CONSEQUENCES );
                });
        }
    }
}