"use strict";

namespace HsLogic {

    export interface IChooseActionParamSets<T extends HsEntity> {
        source: T[],
        result: T[]
    }

    export interface MakeAChoiceAtRandomParam<T extends HsEntity> extends IActionParam {
        sets: IChooseActionParamSets<T>,
        props: MathUtils.ISelectAtRandomProperties
    }


    /**
     * MakeChoiceAtRandom
     *
 	 */
    export class MakeChoiceAtRandom<T extends HsEntity, P extends MakeAChoiceAtRandomParam<T>> extends Action<P> {
        resolve( self: MakeChoiceAtRandom<T, P>, context: HsGameCtx ): PromiseOfActions {
            return new Promise<jsLogic.IAction<HsGameCtx>[]>(
                ( resolve, reject ): void => {
                    let param: P = self.param;

                    param.sets.result.concat( MathUtils.selectAtRandom<T>( param.sets.source, param.props ) );

                    resolve( jsLogic.NO_CONSEQUENCES );
                });
        }
    }
}