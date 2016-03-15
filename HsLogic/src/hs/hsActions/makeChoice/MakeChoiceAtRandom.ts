"use strict";

namespace HsLogic {

    export interface IChooseActionParamSets<T extends HsEntity> {
        source: T[],
        result: T[]
    }

    export interface MakeAChoiceAtRandomParam<T extends HsEntity> extends IHsActionParam {
        sets: IChooseActionParamSets<T>,
        props: MathUtils.ISelectAtRandomProperties
    }


    /**
     * MakeChoiceAtRandom
     *
 	 */
    export class MakeChoiceAtRandom<T extends HsEntity, P extends MakeAChoiceAtRandomParam<T>> extends HsAction<P> {
        resolve( _this_: MakeChoiceAtRandom<T, P>, gameCtx: HsGameCtx ): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = _this_.param;

                    param.sets.result.concat( MathUtils.selectAtRandom<T>( param.sets.source, param.props ) );

                    resolve( jsLogic.NO_CONSEQUENCES );
                });
        }
    }
}